'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
   // winston = require('winston'),
   async=require('async'),
   Tenant = mongoose.model('Tenant'),
   js2xmlparser = require('js2xmlparser');

var directory={
	'@':{
		'type':'freeswitch/xml'
	},
	'section':{
		'@':{'name':'directory'}
	}
};
exports.getConfig =  function(req, res){
	async.parallel([
		function(callback){
			exports.getTenants(callback);
		},
	],
	function(err, results){
		if(results[0]){
			directory.section.domain=results[0];
		}
		req.setEncoding('utf8');
		res.header('Content-Type', 'text/xml');
		res.send(js2xmlparser('document',directory));
	});
};
exports.getTenants=function(callback){
	var tenantsConfig=[];
	Tenant.find().lean().populate('users').exec(function(err, tenants) {
		if (err) {
			return callback(err);
		} else {
			_.forEach(tenants,function(tenant){
				var d={'@':{'name':tenant.name},'variables':{'variable':[]},params:{'param':[]},'groups':{'group':{'@':{'name':'default'},'users':{'user':[]}}}};
				//variables
				_.forEach(tenant.variables,function(v){
					d.variables.variable.push({'@':{'name':v.name,'value':v.value}});
				});
				//params
				_.forEach(tenant.params,function(v){
					d.params.param.push({'@':{'name':v.name,'value':v.value}});
				});
				_.forEach(tenant.users,function(user){
					var u={'@':{'id':user.username},'variables':{'variable':[]},params:{'param':[]}};
					_.forEach(user.variables,function(v){
						u.variables.variable.push({'@':{'name':v.name,'value':v.value}});
					});
					_.forEach(user.params,function(p){
						u.params.param.push({'@':{'name':p.name,'value':p.value}});
					});
					d.groups.group.users.user.push(u);
				});
				tenantsConfig.push(d);
			});
			return callback(null,tenantsConfig);
		}
	});
		
};