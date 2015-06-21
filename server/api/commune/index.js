'use strict';

var express = require('express');
var controller = require('./commune.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/geoloc',auth.isAuthenticated(),controller.geoloc);
router.get('/',auth.isAuthenticated(),controller.index);
router.get('/:id',auth.isAuthenticated(),controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;