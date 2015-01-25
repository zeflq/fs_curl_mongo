'use strict';

module.exports = function(app) {
	var configuration = require('../../app/controllers/configuration');
	var directory = require('../../app/controllers/directory');
	var dialplan = require('../../app/controllers/dialplan');
	
	//all get request are used for test
	app.route('/configuration')
	.post(configuration.isEnabled,configuration.dispatch)
	.get(configuration.test);

	app.route('/directory')
	.post(directory.getConfig)
	.get(directory.getConfig);

	app.route('/dialplan')
	.post(dialplan.getConfig)
	.get(dialplan.getConfig);
};
