'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	EventSocket = mongoose.model('EventSocket');

/**
 * Globals
 */
var esl;
/**
 * Unit tests
 */
describe('EventSocket Model Unit Tests:', function() {
	before(function(done){
		EventSocket.remove().exec(done);
	});

	it('should add host to EventSocket', function(done){
		esl=	new EventSocket({name:'listen-ip',value:'127.0.0.1'});
		esl.save();
		esl=	new EventSocket({name:'listen-port',value:'8021'});
		esl.save();
		esl=	new EventSocket({name:'password',value:'ClueCon'});
		esl.save(done);     
	});
});