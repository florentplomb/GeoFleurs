'use strict';

var _ = require('lodash');
var Fleur = require('./fleur.model');

// Get list of fleurs
exports.index = function(req, res) {
  Fleur.find(function (err, fleurs) {
    if(err) { return handleError(res, err); }
    return res.json(200, fleurs);
  });
};

// Get a single fleur
exports.show = function(req, res) {
  Fleur.findById(req.params.id, function (err, fleur) {
    if(err) { return handleError(res, err); }
    if(!fleur) { return res.send(404); }
    return res.json(fleur);
  });
};

// Creates a new fleur in the DB.
exports.create = function(req, res) {
  Fleur.create(req.body, function(err, fleur) {
    if(err) { return handleError(res, err); }
    return res.json(201, fleur);
  });
};

// Updates an existing fleur in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fleur.findById(req.params.id, function (err, fleur) {
    if (err) { return handleError(res, err); }
    if(!fleur) { return res.send(404); }
    var updated = _.merge(fleur, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, fleur);
    });
  });
};

// Deletes a fleur from the DB.
exports.destroy = function(req, res) {
  Fleur.findById(req.params.id, function (err, fleur) {
    if(err) { return handleError(res, err); }
    if(!fleur) { return res.send(404); }
    fleur.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}