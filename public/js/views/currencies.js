define(['jquery',
		'backbone',
		'templates',
		'bootstrap'
	], function ($, Backbone, templates) {
	var Currencies = Backbone.View.extend({
		el: '#contentRegion',
		events: {
		},
		initialize: function (options) {
			console.log('Currencies view initialized');
			this.currenciesModel = options.currenciesModel;
		},
		render: function () {
			var currenciesData = this.currenciesModel.get('currencies');
			this.$el.html(templates.currencies({currency: currenciesData}));
		}
	});
	return Currencies;
});