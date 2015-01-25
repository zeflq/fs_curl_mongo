'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
XmlCdr = mongoose.model('XmlCdr'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'xml_cdr.conf',
	 	'description':'XML CDR'
	},
	'settings':{}
};
exports.getConfig = function(callback) {
	configuration.settings.param=[];
	XmlCdr.find()
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