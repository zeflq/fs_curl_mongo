'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ModlessConf Schema
 */
var ModlessConfSchema = new Schema({
	name:{
		type:String
	}
},{collection:'modless_conf'});

mongoose.model('ModlessConf', ModlessConfSchema);