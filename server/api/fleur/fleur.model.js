'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FleurSchema = new Schema({
	type: String,
	properties: {
		espece: {
			type: Schema.Types.ObjectId,
			ref: 'Espece'
		},
		communes: {
			type: Schema.Types.ObjectId,
			ref: 'Commune'
		},

		complete: Boolean, // information
		active: Boolean // soft delete
	},
	geometry: Schema.Types.Mixed,

});

module.exports = mongoose.model('Fleur', FleurSchema);