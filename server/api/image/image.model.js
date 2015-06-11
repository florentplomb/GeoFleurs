'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
	 data: Buffer,
	 contentType: String,
	user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
});

module.exports = mongoose.model('Image', ImageSchema);