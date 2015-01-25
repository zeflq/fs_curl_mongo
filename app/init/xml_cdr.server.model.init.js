'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	XmlCdr = mongoose.model('XmlCdr');

/**
 * Globals
 */
var cdr;
/**
 * Unit tests
 */
describe('XmlCdr Model Unit Tests:', function() {
	before(function(done){
		XmlCdr.remove().exec(done);
	});

	it('should add url to XmlCdr', function(done){
		cdr=	new XmlCdr({name:'url',value:'http://localhost/cdr.php'});
		cdr.save(done);    
	});
	it('should add delay to XmlCdr', function(done){
		cdr=	new XmlCdr({name:'delay',value:'120'});
		cdr.save(done);    
	});
	it('should add log-dir to XmlCdr', function(done){
		cdr=	new XmlCdr({name:'log-dir',value:'/var/log/cdr'});
		cdr.save(done);    
	});
	it('should add err-log-dir to XmlCdr', function(done){
		cdr=	new XmlCdr({name:'err-log-dir',value:'/var/log/cdr/errors'});
		cdr.save(done);    
	});
	it('should add encode to XmlCdr', function(done){
		cdr=	new XmlCdr({name:'encode',value:'True'});
		cdr.save(done);    
	});
});