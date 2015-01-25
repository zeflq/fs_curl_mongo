'use strict';

/**
 * PostLoadModules dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
   js2xmlparser = require('js2xmlparser'),
   PostLoadModules = mongoose.model('PostLoadModules'),
   ModlessConf = mongoose.model('ModlessConf'),
   async=require('async');


/**
 * Create a Configuration
 */
 var ModuleNotFound={
 	'@':{
 		'type':'freeswitch/xml'
 	},
 	'section':{
 		'@':{'name':'result'},
 		'result':{
 			'status':'not found'
 		}
 	}
 };
 var mod={
 	'@':{
 		'type':'freeswitch/xml'
 	},
 	'section':{
 		'@':{'name':'configuration'},
 		'configuration':{
 			'@':{
	 			'name':'',
	 			'description':''
	 		}
 		}
 	}
 };
exports.dispatch =  function(req, res){
	if(req.body.key_value){
		var config=req.body.key_value.split('.')[0];
		try{
			var modController =  require('./configuration/'+config);
			async.parallel([
				function(callback){
					modController.getConfig(callback);
				}
			],
			function(err, results){
				console.log('load mod  '+config+' ok');
				mod.section.configuration=results;
				req.setEncoding('utf8');
				res.header('Content-Type', 'text/xml');
				res.send(js2xmlparser('document',mod));
			});
		}catch(err){
			console.log('unable to include '+config);
			req.setEncoding('utf8');
			res.header('Content-Type', 'text/xml');
			res.send(js2xmlparser('document',ModuleNotFound));
		}	
	}
};
exports.is_mod_enabled = function(moduleName,callback) {
	if(moduleName){
		PostLoadModules.findOne({
			'name':'mod_'+moduleName,
			xml_curl_enabled:true
		})
		.lean()
		.exec(function(err,module){
			if(module){
				return callback(null,true);
			}else{
				return callback(null,false);
			}
		});
	}else{
		return callback(null,false);
	}
};
//ex:post_load_modules is modless
exports.is_modless_conf = function(moduleName,callback) {
	if(moduleName){
		ModlessConf.findOne({'name':moduleName})
		.lean()
		.exec(function(err,configName){
			if(configName){
				return callback(null,true);
			}else{
				return callback(null,false);
			}
		});
	}else{
		return callback(null,false);
	}
};
/**
 * middleware
 */
exports.isEnabled = function(req, res, next) {
	if(req.body.key_value){
		var modulesName=req.body.key_value.split('.')[0];
		async.parallel([
			function(callback){
				exports.is_mod_enabled(modulesName,callback);
			},
			function(callback){
				exports.is_modless_conf(modulesName,callback);
			}
		],
		function(err, results){
			if(!results[0] && !results[1]){
				//console.log('mod_'+modulesName+' is not enabled');
				req.setEncoding('utf8');
				res.header('Content-Type', 'text/xml');
				res.send(js2xmlparser('document',ModuleNotFound));
			}else{
				next();
			}
		});
	}
};
exports.test =  function(req, res){
	var self=this;
	var modController =  require('./configuration/callcenter');
	async.parallel([
	    function(callback){
	    	modController.getConfig(callback);
	    }
	],
	// optional callback
	function(err, results){
		mod.section.configuration=results;
		req.setEncoding('utf8');
		res.header('Content-Type', 'text/xml');
		res.send(js2xmlparser('document',mod));
	});
};
