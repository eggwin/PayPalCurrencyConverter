define(['jquery',
       	'underscore',
		'backbone',
		'Conversions',
		'templates',
		'helpers',
		'bootstrap'
	], function ($, _, Backbone, Conversions, templates, helpers) {
	var Transactions = Backbone.View.extend({
		el: '#contentRegion',
		events: {
			'change .conversionDropdown': 'convert'
		},
		initialize: function (options) {
			console.log('Transactions view initialized');
			this.paymentsModel = options.paymentsModel;
			this.currenciesModel = options.currenciesModel;
		},
		render: function () {
			var transactionsData = this.paymentsModel.get('payments'),
				currenciesData = this.currenciesModel.get('currencies');
			this.$el.html(templates.transactions({transactions: transactionsData, currency: currenciesData}));
		},
		convert: function (e) {
			var previousValue = $(e.target).find('option[selected]').val(),
				currentValue = e.target.value,
				amountContainer = $(e.currentTarget).siblings()[2],
				re = /(\d*(?:\.\d*)?)/g,
				amount = parseFloat(_($(amountContainer).text().match(re)).compact()),
				conversions = new Conversions({
					amount: amount,
					convertFrom: previousValue,
					convertTo: currentValue
				});
			conversions.fetch().then(function (data) {
				$(amountContainer).html(data.symbolTo + data.converted);
			}.bind(this));
		}
	});
	return Transactions;
});