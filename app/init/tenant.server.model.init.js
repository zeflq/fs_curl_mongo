'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Tenant = mongoose.model('Tenant');

/**
 * Globals
 */
var t;

/**
 * Unit tests
 */
describe('Tenant Model Unit Tests:', function() {
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
		Tenant.findOne({name:'altercall.org'}).exec(function(err, tenant){
			myTenant=tenant;
			done();
		});  
	  });  

	it('should add the tenant if not already exist', function(done){    
	    if(!myTenant){
	    	t.save(done);
	    }else{
	    	done();
	    }
	});
});