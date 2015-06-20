'use strict';

var _ = require('lodash');
var Fleur = require('./fleur.model');
var espName = require('../espName/espName.model');

// Get list of fleurs
exports.index = function(req, res) {
  Fleur.find()
    .populate('properties.espece properties.commune proprietes.commentaires')
    .populate({
      path: 'properties.commune',
      select: 'properties.NAME -_id',
    })
    .exec(function(err, fleurs) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, fleurs);
    });

};

// Get a single fleur
exports.show = function(req, res) {
  Fleur.findById(req.params.id)
  .populate('properties.espece properties.commune proprietes.commentaires')
   .populate({
      path: 'properties.commune',
      select: 'properties.NAME -_id',
    })
  .exec(function(err, fleur) {

    if (err) {
      return handleError(res, err);
    }
    if (!fleur) {
      return res.send(404);
    }
    return res.json(fleur);
  });
};


// Creates a new fleur in the DB.
exports.create = function(req, res) {

  if (!req.body.flower) {
    return res.send(400);
  }

  console.log(req.body.flower)

  var newFleur = new Fleur();

  newFleur.geometry = req.body.flower.geometry;
  newFleur.properties.image = req.body.flower.properties.image;
  newFleur.properties.commune = req.body.flower.properties.commune;

  if (req.body.flower.properties.espece === null) {

    console.log("nulll");
    newFleur.properties.complete = false;

    newFleur.save(function(err, fleurSaved) {
      return res.status(200).json({
        "flower": fleurSaved
      }).end()
    })

  } else {
    espName.findOne({
      ISFS: req.body.flower.properties.espece
    }, function(err, esp) {
      if (err) {
        return res.status(400).json({
          message: 'espece introuvable'
        }).end();
      }
      newFleur.properties.espece = esp.id;

      newFleur.save(function(err, fleurSaved) {
        return res.status(200).json({
          "flower": fleurSaved
        }).end()
      })

    });
  }
};


// Updates an existing fleur in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Fleur.findById(req.params.id, function(err, fleur) {
    if (err) {
      return handleError(res, err);
    }
    if (!fleur) {
      return res.send(404);
    }
    var updated = _.merge(fleur, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, fleur);
    });
  });
};

// Deletes a fleur from the DB.
exports.destroy = function(req, res) {
  Fleur.findById(req.params.id, function(err, fleur) {
    if (err) {
      return handleError(res, err);
    }
    if (!fleur) {
      return res.send(404);
    }
    fleur.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}