'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * login user
 */
exports.login = function(req, res) {

  if (!req.body.email) return res.send(400);
  if (!req.body.password) return res.send(400);

  User.findOne({
    'email': req.body.email
  },  function(err, user) {
    console.log(user);

    if (err) return res.send(500, err);
    if (!user) return res.status(422).json({
          message: 'invalid user'
        }).end();

    var salt = new Buffer(user.salt, 'base64');

   var hashedCli = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64).toString('base64');
   console.log(hashedCli);
   console.log(user.hashedPassword);

      if (hashedCli == user.hashedPassword) {
        var token = jwt.sign({
      _id: user._id
    }, config.secrets.session);

        return res.json(token);

      } else {

        return res.status(422).json({
          message: 'Wrong Password'
        }).end()

      };

  });

}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  console.log(req.body);

  if (!req.body.email) return res.send(400);
  if (!req.body.pseudo) return res.send(400);
  if (!req.body.password) return res.send(400);

  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session);  // {expiresInSeconds : 5} ça marche pas!!!!
    var userSaved = {};
    userSaved = user;

    res.json(token);
  });
};


// exports.create = function (req, res, next) {
//   var newUser = new User(req.body);
//   newUser.provider = 'local';
//   newUser.role = 'user';
//   newUser.save(function(err, user) {
//     if (err) return validationError(res, err);
//     var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
//     res.json({ token: token });
//   });
// };

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};