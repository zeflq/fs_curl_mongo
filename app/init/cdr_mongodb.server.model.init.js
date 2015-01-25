'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	CDRMongodb = mongoose.model('CDRMongodb');

/**
 * Globals
 */
var cdr;
/**
 * Unit tests
 */
describe('CDRMongodb Model Unit Tests:', function() {
	before(function(done){
		CDRMongodb.remove().exec(done);
	});

	it('should add host to CDRMongodb', function(done){
		cdr=	new CDRMongodb({name:'host',value:'127.0.0.1'});
		cdr.save(done);    
	});
	it('should add port to CDRMongodb', function(done){
		cdr=	new CDRMongodb({name:'port',value:'27017'});
		cdr.save(done);    
	});
	it('should add log-b-leg', function(done){
		cdr=	new CDRMongodb({name:'og-b-leg',value:'false'});
		cdr.save(done);    
	});
	it('should add namespace to CDRMongodb', function(done){
		cdr=	new CDRMongodb({name:'namespace',value:'freeswitch.cdr2'});
		cdr.save(done);    
	});
});