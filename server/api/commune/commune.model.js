'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommuneSchema = new Schema({
 type: String,
 properties: Schema.Types.Mixed,
 geometry: Schema.Types.Mixed
});

CommuneSchema.index({
	commune:{
		geomerty: '2dsphere'
	}
});

module.exports = mongoose.model('Commune', CommuneSchema);




