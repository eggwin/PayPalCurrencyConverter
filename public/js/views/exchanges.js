define(['jquery',
		'backbone',
		'templates',
		'bootstrap'
	], function ($, Backbone, templates) {
	var Exchanges = Backbone.View.extend({
		el: '#contentRegion',
		events: {
		},
		initialize: function (options) {
			console.log('Exchanges view initialized');
			this.currenciesModel = options.currenciesModel;
		},
		render: function () {
			var currenciesData = this.currenciesModel.get('currencies');
			this.$el.html(templates.exchanges({currency: currenciesData}));
		}
	});
	return Exchanges;
});