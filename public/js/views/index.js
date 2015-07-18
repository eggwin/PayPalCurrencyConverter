define(['jquery',
       	'underscore',
		'backbone',
		'Transactions',
		'Exchanges',
		'CurrenciesView',
		'Payments',
		'Currencies',
		'Conversions',
		'templates',
		'bootstrap'
	], function ($, _, Backbone, TransactionsView, ExchangesView, CurrenciesView, PaymentsModel, CurrenciesModel, Conversions, templates) {
	var Index = Backbone.View.extend({
		el: '#appRegion',
		events: {
			'click .transactions': 'showTransactions',
			'click .exchanges': 'showExchanges',
			'click .currencies': 'showCurrencies',
			'click .refresh': 'initialize',
			'submit': 'submit'
		},
		initialize: function () {
			// loader
			$(document).ajaxStart(function () {
				$('#loader, .top').toggleClass('hide');
			});
			$(document).ajaxStop(function () {
				$('#loader, .top').toggleClass('hide');
			});
			this.currenciesModel = new CurrenciesModel();
			this.paymentsModel = new PaymentsModel();
			// fetch currencies and payments info, save them, then render
			this.currenciesModel.fetch().then(function (currenciesData) {
				this.paymentsModel.fetch().then(function (transactionsData) {
					this.currenciesModel.set('currencies', currenciesData);
					this.paymentsModel.set('payments', transactionsData);
					this.render();
				}.bind(this));
			}.bind(this));
		},
		render: function () {
			// render nav buttons and content region below it
			this.$el.append(templates.nav).append(templates.content);
			// render transactions since it's selected by default
			this.showTransactions();
		},
		showTransactions: function () {
			var transactionsView = new TransactionsView({paymentsModel: this.paymentsModel, currenciesModel: this.currenciesModel});
			transactionsView.render();
		},
		showExchanges: function () {
			var exchangesView = new ExchangesView({currenciesModel: this.currenciesModel});
			exchangesView.render();
		},
		showCurrencies: function () {
			var currenciesView = new CurrenciesView({currenciesModel: this.currenciesModel});
			currenciesView.render();
		},
		submit: function (e) {
			e.preventDefault();
			var form = this.$el.find('#convertForm'),
				amount = $(form).find('#amountToConvert').val();
			if (!isNaN(parseInt(amount))) {
				this.$el.find('input').removeClass('bg-danger');
				var convertFrom = $(form).find('#currencyToConvertFrom').val(),
					convertTo = $(form).find('#currencyToConvertTo').val(),
					conversions = new Conversions({
						amount: amount,
						convertFrom: convertFrom,
						convertTo: convertTo
					});
				conversions.fetch().then(function (data) {
					this.$el.find('#currencyResult').html(convertFrom + ' ' + data.symbolFrom + amount + ' = ' + convertTo + ' ' + data.symbolTo + data.converted);
				}.bind(this));
			}
		}
	});
	return Index;
});