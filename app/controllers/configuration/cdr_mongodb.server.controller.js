'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
CDRMongodb = mongoose.model('CDRMongodb'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'cdr_mongodb.conf',
	 	'description':'MongoDB CDR logger'
	},
	'settings':{}
};
exports.getConfig = function(callback) {
	configuration.settings.param=[];
	CDRMongodb.find()
 	.lean()
 	.exec(function(err, cdr) {
			if (err) {
				return callback(err)	;
			} else {
				_.forEach(cdr,function(c){
					configuration.settings.param.push({'@':{name:c.name,value:c.value}});
				});
				return callback(null,configuration);
			}
		});
};