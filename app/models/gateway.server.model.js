'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	relationship = require('mongoose-relationship'),
	Schema = mongoose.Schema;

/**
 * Gateway Schema
 */
var GatewaySchema = new Schema({
	name:{
		type: String
	},
	params:[
		{
			name:String,
			value:String
		}
	],
	sip_profile: { 
		type:Schema.ObjectId, ref:'SIPProfile', childPath:'gateways'
	},
	enabled: {
		type: Boolean,
		default:true,
	},
	tenant: {
		type:Schema.ObjectId, ref:'Tenant' //visibility
	}
});

GatewaySchema.plugin(relationship, { relationshipPathName:'sip_profile' });
mongoose.model('Gateway', GatewaySchema);