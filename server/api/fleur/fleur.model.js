'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	CommentSchema = mongoose.model('Comment').schema;

var FleurSchema = new Schema({

	type: {
		type: String,
		default: "Feature"
	},

	properties: {
		image: {
			type: Schema.Types.ObjectId,
			ref: 'Image'
		},
		espece: {
			type: Schema.Types.ObjectId,
			ref: 'EspName'
		},
		commune: {
			type: Schema.Types.ObjectId,
			ref: 'Commune'
		},
		commentaires: [CommentSchema],
		complete: {
			type: Boolean,
			default: true
		}, // information
		active: {
			type: Boolean,
			default: true
		}, // soft delete
	},

	geometry: Schema.Types.Mixed,



});

module.exports = mongoose.model('Fleur', FleurSchema);