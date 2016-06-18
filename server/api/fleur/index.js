'use strict';

var express = require('express');
var controller = require('./fleur.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/userFlowers', controller.userFlowers);
router.get('/:id', controller.show);


router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);


// router.patch('/:id',auth.hasRole('admin'),auth.isAuthenticated(), controller.update);
// router.delete('/:id',auth.hasRole('admin'),auth.isAuthenticated(), controller.destroy);

module.exports = router;