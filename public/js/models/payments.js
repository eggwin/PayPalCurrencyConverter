define(['jquery',
		'backbone'
	], function ($, Backbone) {
	'use strict';
	var Payments = Backbone.Model.extend({
		url: '/paypal/activity',
		defaults: {}
	});
	return Payments;
});