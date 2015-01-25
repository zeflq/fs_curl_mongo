'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	relationship = require('mongoose-relationship'),
	Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	params:
	[
		{
			name:String,value:String
		}
	],
	variables:
	[
		{
			name:String,value:String
		}
	],
	tenant: { type:Schema.ObjectId, ref:'Tenant', childPath:'users' }
});

UserSchema.plugin(relationship, { relationshipPathName:'tenant' });
mongoose.model('User', UserSchema);