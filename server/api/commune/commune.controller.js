// Copyright (C) 2015 Plomb Florent plombf@gmail.com

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
'use strict';

var _ = require('lodash');
var Commune = require('./commune.model');



exports.geoloc = function(req, res) {
    console.log(req.body.zone);

    if (!req.body.zone) return res.status(400).json({
     message: 'bad request'
    }).end();


      console.log(req.body.zone.geometry.coordinates.length);
      if (req.body.zone.geometry.coordinates.length < 1) return res.status(400).json({
     message: 'bad coordinates'
    }).end();

var zone = req.body.zone;
    var communeName = [];
    Commune.find({
        geometry: {
          $geoIntersects: {
            $geometry: zone.geometry
          }
        }
      })
      .select("properties _id")
      .exec(function(err, communes) {
        if (err) return res.status(400).json({
     message: 'problème bad'
    }).end();
        communes.forEach(function(commune) {
        communeName.push(commune);
        });
        return res.status(200).json(communeName)

      });

};


// Get list of communes
exports.index = function(req, res,next) {

    Commune.find()
      .select("properties _id")
      .exec(function(err, communes){
         if (err) return next(err);
          return res.json(200, communes);
      })

  };


// Get a single commune
exports.show = function(req, res) {
  Commune.findById(req.params.id, function (err, commune) {
    if(err) { return handleError(res, err); }
    if(!commune) { return res.send(404); }
    return res.json(commune);
  });
};

// Creates a new commune in the DB.
exports.create = function(req, res) {
  Commune.create(req.body, function(err, commune) {
    if(err) { return handleError(res, err); }
    return res.json(201, commune);
  });
};

// Updates an existing commune in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Commune.findById(req.params.id, function (err, commune) {
    if (err) { return handleError(res, err); }
    if(!commune) { return res.send(404); }
    var updated = _.merge(commune, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, commune);
    });
  });
};

// Deletes a commune from the DB.
exports.destroy = function(req, res) {
  Commune.findById(req.params.id, function (err, commune) {
    if(err) { return handleError(res, err); }
    if(!commune) { return res.send(404); }
    commune.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}