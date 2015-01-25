'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * XmlCdr Schema
 */
var XmlCdrSchema = new Schema({
		name:String,
		value:String
	// settings:[
	// 	{		
	// 		name:String,
	// 		value:String
	// 	}
	// ]
},{collection:'xml_cdr'});

mongoose.model('XmlCdr', XmlCdrSchema);