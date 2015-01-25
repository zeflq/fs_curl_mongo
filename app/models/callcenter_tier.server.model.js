'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	relationship = require('mongoose-relationship'),
	Schema = mongoose.Schema;

/**
 * CallcenterTier Schema
 */
var CallcenterTierSchema = new Schema({
	// agent_name: {
	// 	type:String
	// },
	// queue_name: {
	// 	type:String
	// },
	level: {
		type:Number,
		default:1
	},
	position: {
		type:Number,
		default:1
	},
	agent:{
		type:Schema.ObjectId, ref:'CallcenterAgent',childPath:'tiers'
	},
	queue:{
		type:Schema.ObjectId, ref:'CallcenterQueue',childPath:'tiers'
	},
	tenant: {
		type:Schema.ObjectId, ref:'Tenant' //visibility
	}
},{collection:'call_center_tiers'});

CallcenterTierSchema.plugin(relationship, { relationshipPathName:['agent','queue'] });
mongoose.model('CallcenterTier', CallcenterTierSchema);