'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	tree = require('mongoose-tree2'),
	relationship = require('mongoose-relationship'),
	Schema = mongoose.Schema;

/**
 * DialplanDetail Schema
 */
var DialplanDetailSchema = new Schema({
	'tag':String,
	'type':String,
	'data':String,
	'attributes':[{name:String,value:String}],
	'order':{type:Number,default:0},
	// 'break':String,
	// 'inline':String,
	// 'regex':String,
	// 'require-nested':String,
	'dialplan': { type:Schema.ObjectId, ref:'Dialplan', childPath:'details' }
},{collection:'dialplan_details'});

DialplanDetailSchema.plugin(tree);
DialplanDetailSchema.plugin(relationship, { relationshipPathName:'dialplan' });
mongoose.model('DialplanDetail', DialplanDetailSchema);