'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * EventSocket Schema
 */
var EventSocketSchema = new Schema({
	name:String,
	value:String
},{collection:'event_socket'});

mongoose.model('EventSocket', EventSocketSchema);