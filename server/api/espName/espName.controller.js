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
// var giSearch = require('google-image-search');
// var client = require ('google-images');
var fs = require('fs');
var EspName = require('./espName.model');


// Get list of espNames
exports.index = function(req, res) {
  EspName.find(function (err, espNames) {
    if(err) { return handleError(res, err); }
    return res.json(200, espNames);
  });
};


// Get a single espName
exports.gsearch = function(req, res) {

  // client.search('Michael Jackson'),function(err, images) {
  //   image.writeTo('test.jpeg');
  // }


return res.json("ok");
};


// Get a single espName
exports.show = function(req, res) {
  EspName.findById(req.params.id, function (err, espName) {
    if(err) { return handleError(res, err); }
    if(!espName) { return res.send(404); }
    return res.json(espName);
  });
};

// Creates a new espName in the DB.
exports.create = function(req, res) {
  EspName.create(req.body, function(err, espName) {
    if(err) { return handleError(res, err); }
    return res.json(201, espName);
  });
};

// Updates an existing espName in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  EspName.findById(req.params.id, function (err, espName) {
    if (err) { return handleError(res, err); }
    if(!espName) { return res.send(404); }
    var updated = _.merge(espName, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, espName);
    });
  });
};

// Deletes a espName from the DB.
exports.destroy = function(req, res) {
  EspName.findById(req.params.id, function (err, espName) {
    if(err) { return handleError(res, err); }
    if(!espName) { return res.send(404); }
    espName.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}