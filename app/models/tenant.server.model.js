'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tenant Schema
 */
var TenantSchema = new Schema({
	name: {
		type: String
	},
	params:[
		{
			name:String,
			value:String
		}
	],
	variables:[
		{
			name:String,
			value:String
		}
	],
	users:[{ type:Schema.ObjectId, ref:'User' }],
	description: {
		type: String
	}
});

mongoose.model('Tenant', TenantSchema);