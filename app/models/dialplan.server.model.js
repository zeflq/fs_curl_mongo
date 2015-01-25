'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dialplans Schema
 */
var DialplanSchema = new Schema({
		'name':String,
		'context':String,
		'continue':Boolean,
		'enabled':Boolean,
		'details':
		[
			{
			 type:Schema.ObjectId, ref:'DialplanDetail' 
			}
		],
		'tenant':
		{
			type:Schema.ObjectId, ref:'Tenant'
		}
});

mongoose.model('Dialplan', DialplanSchema);