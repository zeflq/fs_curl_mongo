'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * CallcenterQueue Schema
 */
var CallcenterQueueSchema = new Schema({
	name:{
		type:String
	},
	strategy:{
		type:String
	},
	moh_sound:{
		type:String
	},
	announce_sound:{
		type:String
	},
	announce_frequency:{
		type:Number
	},
	record_template:{
		type:String
	},
	time_base_score:{
		type:String,
		default:'queue'
	},
	tier_rules_apply:{
		type:Boolean
	},
	tier_rule_wait_second:{
		type:Number
	},
	tier_rule_wait_multiply_level:{
		type:Boolean
	},
	tier_rule_no_agent_no_wait:{
		type:Boolean
	},
	discard_abandoned_after:{
		type:Number
	},
	abandoned_resume_allowed:{
		type:Boolean
	},
	max_wait_time:{
		type:Number,
		default:0
	},
	max_wait_time_with_no_agent:{
		type:Number,
		default:0
	},
	max_wait_time_with_no_agent_time_reached:{
		type:Number,
		default:5
	},
	tiers:[
		{
			type:Schema.ObjectId, ref:'CallcenterTier'
		}
	],
	tenant: {
		type:Schema.ObjectId, ref:'Tenant' //visibility
	}
},{collection:'call_center_queues'});

mongoose.model('CallcenterQueue', CallcenterQueueSchema);