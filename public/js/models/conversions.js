define(['jquery',
		'backbone'
	], function ($, Backbone) {
	'use strict';
	var Conversion = Backbone.Model.extend({
		url: '/paypal/currencyConversion/1/USD/EUR',
		initialize: function (options) {
			this.url = '/paypal/currencyConversion/'+options.amount+'/'+options.convertFrom+'/'+options.convertTo;
		}
	});
	return Conversion;
});