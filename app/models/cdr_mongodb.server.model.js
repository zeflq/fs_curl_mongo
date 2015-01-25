'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * CdrMongodb Schema
 */
var CDRMongodbSchema = new Schema({
	name:String,
	value:String
	// settings:[
	// 	{
	// 		name:String,
	// 		value:String
	// 	}
	// ]
},{collection:'cdr_mongodb'});

mongoose.model('CDRMongodb', CDRMongodbSchema);