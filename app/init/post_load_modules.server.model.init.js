'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	PostLoadModules = mongoose.model('PostLoadModules');

/**
 * Globals
 */
var mod_sofia,mod_callcenter,mod_xml_cdr,mod_event_socket,mod_cdr_mongodb;
/**
 * Unit tests
 */
describe('PostLoadModules Model Unit Tests:', function() {
	before(function(done){
		mod_sofia=new PostLoadModules({name:'mod_sofia',label:'sofia',load_module:true,xml_curl_enabled:true,description:'no init desc'});
		mod_callcenter=new PostLoadModules({name:'mod_callcenter',label:'callcenter',load_module:true,xml_curl_enabled:true,description:'no init desc'});
		mod_xml_cdr=new PostLoadModules({name:'mod_xml_cdr',label:'xml cdr',load_module:true,xml_curl_enabled:true,description:'no init desc'});
		mod_event_socket=new PostLoadModules({name:'mod_event_socket',label:'event socket',load_module:true,xml_curl_enabled:true,description:'no init desc'});
		mod_cdr_mongodb=new PostLoadModules({name:'mod_cdr_mongodb',label:'cdr mongodb',load_module:true,xml_curl_enabled:true,description:'no init desc'});
		PostLoadModules.remove().exec(done);
	});

	it('should add mod_sofia to post load Modules', function(done){    
		mod_sofia.save(done);
	});
	it('should add mod_callcenter to post load Modules', function(done){    
		mod_callcenter.save(done);
	});
	it('should add mod_xml_cdr to post load Modules', function(done){    
		mod_xml_cdr.save(done);
	});
	it('should add mod_event_socket to post load Modules', function(done){    
		mod_event_socket.save(done);
	});
	it('should add mod_cdr_mongodb to post load Modules', function(done){    
		mod_cdr_mongodb.save(done);
	});
});