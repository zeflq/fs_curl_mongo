'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Tenant = mongoose.model('Tenant'),
	CallcenterTier = mongoose.model('CallcenterTier'),
	CallcenterAgent = mongoose.model('CallcenterAgent'),
	CallcenterQueue = mongoose.model('CallcenterQueue');

/**
 * Globals
 */
/**
 * Unit tests
 */
describe('Call center init', function() {
	var myTenant,id,agent1,queue1;  
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

		CallcenterTier.remove().exec();     
		CallcenterAgent.remove().exec();     
		CallcenterQueue.remove().exec();     
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
	it('should agent agent1 ', function(done){
		   agent1=new CallcenterAgent({name:'agent1',tenant:id,contact:'user/agent1@altercall.org'});
		   agent1.save(done);
	});
	it('should queue1', function(done){
		   queue1=new CallcenterQueue({name:'queue1',tenant:id});
		   queue1.save(done);
	});
	it('should tier', function(done){
		   queue1=new CallcenterTier({agent:agent1.id,tenant:id,queue:queue1.id});
		   queue1.save(done);
	});
});