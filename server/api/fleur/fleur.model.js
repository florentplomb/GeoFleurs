'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FleurSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Fleur', FleurSchema);