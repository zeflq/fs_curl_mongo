'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    async=require('async'),
   Dialplan = mongoose.model('Dialplan'),
   DialplanDetail = mongoose.model('DialplanDetail'),
   js2xmlparser = require('js2xmlparser');

var dialplan={
	'@':{
		'type':'freeswitch/xml'
	},
	'section':{
		'@':{'name':'dialplan'}
	}
};
exports.getConfig =  function(req, res){
	async.waterfall([
		function(callback){
			exports.getDialplanGoubedByContext(callback);
		},
		function(groupedContexts,callback){
			var contexts=[];
			var q = async.queue(function (context, callback) {
				var mycontext={'@':{name: context.name}};
			     async.map(context.extensions, exports.getExtensions.bind(exports), function(err, extensions){
			     	mycontext.extension=extensions;
			     	contexts.push(mycontext);
					callback();
				});
			}, 1);
			q.drain = function() {
				console.log('all Contexts has been processed');
				callback(null,contexts); 
			};
			if(_.isEmpty(groupedContexts)){
				callback(null,'');
			}else{
				_.forEach(groupedContexts,function(c,key){
					q.push({extensions:c,name:key});
				});
			}
		},
	],
	function(err, results){
		if(results){
			dialplan.section.context=results;
		}
		req.setEncoding('utf8');
		res.header('Content-Type', 'text/xml');
		res.send(js2xmlparser('document',dialplan));
	});
};
exports.getDialplanGoubedByContext =  function(callback){
	Dialplan.find({enabled:true})
	.sort({ order : 'asc'})
	.populate({path:'details',match:{'parent':{'$exists': false }}})
	.exec(function(err, dialplans) {
		if (err) {
			return callback(err);
		} else {
			var groupedContexts=_.groupBy(dialplans,function(key){
				return key.context;
			});
			return callback(null,groupedContexts);
		}
	});
};
exports.getExtensions =  function(extension,callback){
	var extensions=[];
	var ext={'@':{'name':extension.name}};
	if(extension.continue !== undefined){
		ext['@'].continue=extension.continue;
	}
	 async.map(extension.details, exports.getConditions, function(err, conditions){
	 	ext.condition=conditions;
		extensions.push(ext);
		callback(null,extensions);
	 });
};
exports.getConditions =  function(parentCondition,callback){
	//var condition={'@':{field:parentCondition.type,expression:parentCondition.data}};
	var condition=exports.buildConditions(parentCondition);
	parentCondition.getChildrenTree({},function(err,children) {
		condition=_.assign(condition,exports.getSubConditions(children));
		callback(null,condition);
	});

};
exports.buildConditions =  function(c){
	var condition={'@':{}};
	if(c.type !== undefined && c.data !== undefined){
		condition={'@':{field:c.type,expression:c.data}};
	}
	_.forEach(c.attributes,function(c){
			condition['@'][c.name]=c.value;
	});
	return condition;
};
exports.buildActions =  function(a){
	var action={'@':{}};
	if(a.type !== undefined && a.data !== undefined){
		action={'@':{application:a.type,data:a.data}};
	}else if(a.type !== undefined ){
		action={'@':{application:a.type}};
	}
	return action;
};
exports.getSubConditions =  function(children){
	var tags={
		'condition':[],
		'regex':[],
		'action':[],
		'anti-action':[]
	};
	children=_.sortBy(children, function(num) { return num.order; });
	_.forEach(children,function(child){
		if (child.childs.length>0) {
			tags.condition.push(
		 		_.assign(
		 			exports.buildConditions(child),
		 			exports.getSubConditions(child.childs)
		 		)
		 	);
		}else{
			switch(child.tag) {
				case 'action':
					tags.action.push(exports.buildActions(child));
				break;
				case 'condition':
					tags.condition.push(exports.buildConditions(child));
				break;
				case 'anti-action':
					tags['anti-action'].push(exports.buildActions(child));
				break;
				case 'regex':
					tags.regex.push(exports.buildConditions(child));
				break;
			}
		}
	});
	return tags;
};