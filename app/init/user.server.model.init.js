'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tenant = mongoose.model('Tenant');

/**
 * Globals
 */
var t,id;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	var myTenant;  
	var t = new Tenant({
		name:'altercall.org',
		params:
		[
			{ 
			'name' : 'dial-string',
			'value' : '{^^:sip_invite_domain=${dialed_domain}:presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(*/${dialed_user}@${dialed_domain})}'
			}
        ],
        variables:
        [
        	{
			'name' : 'user_context',
        	'value':'altercall.org'
        	}
        ]
	}); 
	 before(function(done){     
	 	User.remove().exec();     
		Tenant.findOne({name:'altercall.org'}).exec(function(err, tenant){
			myTenant=tenant;
			done();
		});  
	  });  

	it('should add the tenant if not already exist', function(done){    
	    if(!myTenant){
	    	id=t.id;
	    	t.save(done);
	    }else{
	    	id=myTenant.id;
	    	done();
	    }
	});
	it('should add user agent1',function(done){
		var u=new User({'username':'agent1',
						'password':'agent1',
						params:[{name:'password',value:'agent1'}],
						variables:[
							{'name':'toll_allow', 'value':'domestic,international,local'},
							{'name':'accountcode', 'value':'1001'},
							{'name':'effective_caller_id_name', 'value':'Extension 1001'},
							{'name':'effective_caller_id_number', 'value':'1001'},
							{'name':'outbound_caller_id_name', 'value':'$${outbound_caller_name}'},
							{'name':'outbound_caller_id_number', 'value':'$${outbound_caller_id}'},
							{'name':'callgroup', 'value':'techsupport'}
						],
						'tenant':id});
			u.save(done);
	});
	it('should add user1',function(done){
		var u = new User({
				username:'user1',
				password:'user1',
				params:[{name:'password',value:'user1'}],
				variables:[
					{'name':'toll_allow', 'value':'domestic,international,local'},
					{'name':'accountcode', 'value':'1000'},
					{'name':'effective_caller_id_name', 'value':'Extension 1000'},
					{'name':'effective_caller_id_number', 'value':'1000'},
					{'name':'outbound_caller_id_name', 'value':'$${outbound_caller_name}'},
					{'name':'outbound_caller_id_number', 'value':'$${outbound_caller_id}'},
					{'name':'callgroup', 'value':'techsupport'}
				],
				'tenant':id
			});
		u.save(done);
	});
});