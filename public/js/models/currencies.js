define(['jquery',
		'backbone'
	], function ($, Backbone) {
	'use strict';
	var Currencies = Backbone.Model.extend({
		url: '/paypal/currencyList',
		defaults: {}
	});
	return Currencies;
});