'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	SIPProfile = mongoose.model('SIPProfile'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'sofia.conf',
	 	'description':'profiles settings'
	},
	'profiles':{
		'profile':[]
	}
};
//<domain name="all" alias="false" parse="true"/
exports.getConfig = function(callback) {
	configuration.profiles.profile=[];
	SIPProfile.find({enabled:true})
 	.populate({ path:'gateways',match: { enabled: true}})
 	.lean()
 	.exec(function(err, Profiles) {
			if (err) {
				return callback(err)	;
			} else {
				_.forEach(Profiles,function(p){
					var profile={'@':{name:p.name}};
					//SETTINGS
					profile.settings={};
					profile.settings.param=[];
					_.forEach(p.settings,function(s){
						profile.settings.param.push({'@':{'name':s.name,'value':s.value}});
					});
					//DOMAINS
					profile.domains={};
					profile.domains.domain=[];
					_.forEach(p.domains,function(d){
						profile.domains.domain.push({'@':{'name':d.name,'alias':d.alias,'parse':d.parse}});
					});
					//GATEWAYS
					profile.gateways={};
					profile.gateways.gateway=[];
					_.forEach(p.gateways,function(g){
						//var gateway={'@':{name:g.name}};
						var gateway={'@':{name:g._id}};
							gateway.param=[];
						_.forEach(g.params,function(param){
							gateway.param.push({'@':{'name':param.name,'value':param.value}});
						});
						profile.gateways.gateway.push(gateway);
					});
					configuration.profiles.profile.push(profile);
				});
				return callback(null,configuration);
			}
		});
};