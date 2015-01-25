'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
EventSocket = mongoose.model('EventSocket'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'event_socket.conf',
	 	'description':'Socket Client'
	},
	'settings':{}
};
exports.getConfig = function(callback) {
	configuration.settings.param=[];
	EventSocket.find()
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