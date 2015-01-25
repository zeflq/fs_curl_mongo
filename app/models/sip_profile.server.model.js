'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * SIPProfile Schema
 */
var SIPProfileSchema = new Schema({
	name: {
		type: String
	},
	gateways: [
		{
			type:Schema.ObjectId, ref:'Gateway'
		}
	],
	aliases:[
		{
			name:String
		}
	],
	settings:[
		{
			name:String,
			value:String
		}
	],
	enabled: {
		type: Boolean,
		default:true,
	},
	domains:{
		type:[{name:String,alias:Boolean,parse:Boolean}],
		default:{name:'all',alias:false,parse:true}
	}
},{collection:'sip_profiles'});

mongoose.model('SIPProfile', SIPProfileSchema);