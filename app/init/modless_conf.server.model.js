'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	ModlessConf = mongoose.model('ModlessConf');

/**
 * Globals
 */
var m;
/**
 * Unit tests
 */
describe('ModlessConf Model Unit Tests:', function() {
	before(function(done){
		ModlessConf.remove().exec(done);
	});

	it('should add host to ModlessConf', function(done){
		m=	new ModlessConf({name:'post_load_modules'});
		m.save(done);    
	});
});