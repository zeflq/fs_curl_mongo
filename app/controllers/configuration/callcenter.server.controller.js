'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
CallcenterQueue = mongoose.model('CallcenterQueue'),
CallcenterAgent = mongoose.model('CallcenterAgent'),
CallcenterTier = mongoose.model('CallcenterTier'),
 async = require('async'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'callcenter.conf',
	 	'description':'CallCenter'
	},
	'settings':{},
	'queues':{},
	'agents':{},
	'tiers':{}
};
exports.getConfig = function(callback) {
	configuration.queues.queue=[];
	configuration.agents.agent=[];
	configuration.tiers.tier=[];
	async.parallel([
		function(callback){
			exports.getQueues(callback);
		},
		function(callback){
			exports.getAgents(callback);
		},
		function(callback){
			exports.getTiers(callback);
		}
	],
	// optional callback
	function(err, results){
		configuration.queues=results[0];
		configuration.agents=results[1];
		configuration.tiers=results[2];
		callback(null,configuration);
	});
};

exports.getQueues=function(callback){
	var queuesConfig={queue:[]};
	CallcenterQueue.find()
	.populate('tenant')
	.lean()
	.exec(function(err, queues) {
		if (err) {
			return callback(err);
		} else {
			_.forEach(queues,function(queue){
				var tenantName=(queue.tenant && queue.tenant.name)?queue.tenant.name:'';
				var q={'@':{'name':queue.name+'@'+tenantName},param:[]};
					q.param=_.transform(queue, function(result, num,key) {
						if(['name','__v','_id','tenant','tiers'].indexOf(key)===-1)
						return result.push([{'@':{name:key,value:num}}]);
					},[]);
				queuesConfig.queue.push(q);
			});
			return callback(null,queuesConfig);
		}
	});
};
exports.getAgents=function(callback){
	var agentsConfig={agent:[]};
	CallcenterAgent.find()
	.populate('tenant')
	.lean()
	.exec(function(err, agents) {
		if (err) {
			return callback(err)	;
		} else {
			_.forEach(agents,function(agent){
				var tenantName=(agent.tenant && agent.tenant.name)?agent.tenant.name:'';
				var a=_.transform(agent, function(result, num,key) {
					if(['__v','_id','tenant','call_timeout','tiers'].indexOf(key)===-1)
					 {
					 	if(key==='name')
					 	{
					 		num=num+'@'+tenantName;
					 	}
					 	if(key==='contact'){
					 		num='[call_timeout='+agent.call_timeout+']'+num;
					 	}
					 	result[key]=num;
					 }
				});
				agentsConfig.agent.push({'@':a});
			});
			return callback(null,agentsConfig);
		}
	});
};
exports.getTiers=function(callback){
	var tiersConfig={tier:[]};
	CallcenterTier.find()
	.populate('tenant agent queue')
	.lean()
	.exec(function(err, tiers) {
		if (err) {
			return callback(err)	;
		} else {
			_.forEach(tiers,function(tier){
				var tenantName=(tier.tenant && tier.tenant.name)?tier.tenant.name:'';
				var t={'@':{
					'agent':tier.agent.name+'@'+tenantName,
					'queue':tier.queue.name+'@'+tenantName,
					'position':tier.position,
					'level':tier.level
				}};
				tiersConfig.tier.push(t);
			});
			return callback(null,tiersConfig);
		}
	});
};