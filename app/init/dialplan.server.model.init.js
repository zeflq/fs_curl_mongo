'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Tenant = mongoose.model('Tenant'),
	DialplanDetail = mongoose.model('DialplanDetail'),
	Dialplan = mongoose.model('Dialplan');

/**
 * Globals
 */

/**
 * Unit tests
 */
describe('Dialplan Model Unit Tests:', function() {
	var myTenant;
	var id;  
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
		Dialplan.remove().exec();     
		DialplanDetail.remove().exec();     
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

	it('should add hold_music to Dialplan', function(done){
		var d=	new Dialplan(
			{
				name:'hold_music',tenant:id,context:'altercall.org',enabled:true
			}
		);
		d.save();
		var cond1=new DialplanDetail(
				{
					tag:'condition',type:'destination_number',data:'9664',dialplan:d.id
				}
			);
		var action0=new DialplanDetail(
				{
					tag:'action',type:'playback',data:'$${hold_music}',parent:cond1
				}
			);

		cond1.save(function() {
		    action0.save(done);
		  });

	});
	it('should add queue1 to Dialplan', function(done){
		var d=	new Dialplan(
			{
				name:'queue1',tenant:id,context:'altercall.org',enabled:true
			}
		);
		d.save();
		var cond1=new DialplanDetail(
				{
					tag:'condition',type:'destination_number',data:'7000',dialplan:d.id
				}
			);
		var action0=new DialplanDetail(
				{
					tag:'action',type:'callcenter',data:'queue1@${domain_name}',parent:cond1
				}
			);

		cond1.save(function() {
		    action0.save(done);
		  });

	});
});