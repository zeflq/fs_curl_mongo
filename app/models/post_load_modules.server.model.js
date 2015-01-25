'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PostLoadModules Schema
 */
var PostLoadModulesSchema = new Schema({
	name: {
		type: String
	},
	label: {
		type: String
	},
	load_module: {
		type: Boolean
	},
	xml_curl_enabled: {
		type: Boolean
	},
	category:{
		type:String
	},
	priority:{
		type:Number
	},
	description: {
		type: String
	}
},{collection:'post_load_modules'});

mongoose.model('PostLoadModules', PostLoadModulesSchema);