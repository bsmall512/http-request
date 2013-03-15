'use strict';

var client = require('../');

var http = require('http');
var assert = require('assert');

var common = require('./includes/common.js');

var callbacks = {
	exception: 0
};

process.nextTick(function () {
	client.get({
		url: common.options.url,
		maxBody: 'foo'
	}, function (err, res) {});
});

process.on('uncaughtException', function (err) {
	callbacks.exception++;
	assert.ok(err instanceof Error);
	assert.strictEqual(err.message, 'Invalid options.maxBody specification. Expecting a proper integer value.');
});

common.teardown(callbacks);
