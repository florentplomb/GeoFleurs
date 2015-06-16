'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EspNameSchema = new Schema({
  ISFS: Number,
  NOML: String,
  NOMC: String
});

module.exports = mongoose.model('EspName', EspNameSchema);