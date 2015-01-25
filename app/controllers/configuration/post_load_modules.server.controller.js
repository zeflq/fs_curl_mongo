'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
PostLoadModules = mongoose.model('PostLoadModules'),
    _ = require('lodash');

var configuration={
	'@':{
		'name':'post_load_modules.conf',
	 	'description':'post load modules'
	},
	'modules':{}
};
exports.getConfig = function(callback) {
	configuration.modules.load=[];
	PostLoadModules.find({'load_module':true})
	.sort('priority')
 	.lean()
 	.exec(function(err, module) {
			if (err) {
				return callback(err)	;
			} else {
				_.forEach(module,function(m){
					configuration.modules.load.push({'@':{'module':m.name}});
				});
				return callback(null,configuration);
			}
		});
};
