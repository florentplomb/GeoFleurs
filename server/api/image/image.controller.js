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
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var User = require('../user/user.model');
var fs = require('fs');

// Get list of images
exports.index = function(req, res) {
  Image.find(function(err, images) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function(err, img) {

      if (err) {
      return handleError(res, err);
    }

    if (!img) {
      return res.send(404);
    }

    res.contentType(img.contentType);
    return res.send(img.data);


  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {



  if (!req.body.imageB64) {
    console.log("badreq");
    return res.send(404);

  }

  // var newPath = 'server/img/' + image.id + '.jpeg';
  // var minPath = 'server/img/' + image.id + 'min.jpeg';

  // newPath.toString();
  // minPath.toString();


  var newImg = new Image();
  var imgBuf = new Buffer(req.body.imageB64, 'base64');
  newImg.data = imgBuf
  newImg.contentType = 'image/jpeg';
  newImg.save(function(err, img) {
    if (err) throw err;

    return res.json(201, img._id);


  })


  // a.img.data = fs.readFileSync(imgPath);
  // a.img.contentType = 'image/png';
  // Image.create(req.body, function(err, image) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
  //   return res.json(201, fleur);
  // });


  // fs.writeFile(newPath, req.body.image, function(err) {
  //   if (err) throw err;

  //   console.log('It\'s saved!');

  //   lwip.open(newPath, function(err, image) {
  //     image.resize(100, 150, 'lanczos', function(err, imageresize) {
  //       imageresize.writeFile(minPath, function(err) {
  //         if (err) throw err;
  //         return res.status(200).json({
  //           message: 'img saved'
  //         }).end();
  //       });

  //     });

  //   });

  // });

  // // else {
  // //   return res.sendfile(minPath);
  // // };
};

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Image.findById(req.params.id, function(err, image) {
    if (err) {
      return handleError(res, err);
    }
    if (!image) {
      return res.send(404);
    }
    var updated = _.merge(image, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function(err, image) {
    if (err) {
      return handleError(res, err);
    }
    if (!image) {
      return res.send(404);
    }
    image.remove(function(err) {
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