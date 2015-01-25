'use strict';

var mongoose = require('mongoose'),
	SIPProfile = mongoose.model('SIPProfile'),
	PostLoadModules = mongoose.model('PostLoadModules'),
	CDRMongodb = mongoose.model('CDRMongodb'),
	XmlCdr = mongoose.model('XmlCdr'),
	Gateway = mongoose.model('Gateway'),
	CallcenterQueue = mongoose.model('CallcenterQueue'),
	CallcenterTier = mongoose.model('CallcenterTier'),
	CallcenterAgent = mongoose.model('CallcenterAgent'),
	ModlessConf = mongoose.model('ModlessConf'),
	Dialplan = mongoose.model('Dialplan'),
	DialplanDetail = mongoose.model('DialplanDetail'),
	User = mongoose.model('User'),
	Tenant = mongoose.model('Tenant');

/**
 * PostLoadModules dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};
exports.init = function(req, res) {
	var d =new Dialplan({name:'Regex OR Example'});
		d.save(function(err){
		if (err) {
			return res.send(400,err);
		} else {
	 		var c=new DialplanDetail({tag:'condition',type:'regex',data:'any',dialplan:d.id});
	 		var r1=new DialplanDetail({parent:c,tag:'regex',type:'caller_id_name',data:'flq'});
	 		var r2=new DialplanDetail({parent:c,tag:'regex',type:'caller_id_number',data:'1001'});
	 		var a1=new DialplanDetail({parent:c,tag:'action',type:'log',data:'INFO At least one of the conditions matched!'});
	 		var a2=new DialplanDetail({parent:c,tag:'anti-action',type:'log',data:'INFO At least one of the conditions matched!'});
	 		c.save(function(err){
				if (err) {
					return res.send(400,err);
				} else {
					r1.save();
					r2.save();
					a1.save();
					a2.save();
					return res.jsonp('ok');
				}
		 	});
		}
	 });
};
