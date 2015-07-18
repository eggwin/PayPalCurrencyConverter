require.config({
    paths: {
    	jquery: 'js/bower_components/jquery/dist/jquery',
    	underscore: 'js/bower_components/underscore/underscore',
    	backbone: 'js/bower_components/backbone/backbone',
    	handlebars: 'js/bower_components/handlebars/handlebars',
        helpers: 'js/helpers',
    	hbs: 'js/bower_components/require-handlebars-plugin/hbs',
        templates: 'js/views/templates/templates',
    	bootstrap: 'js/bower_components/bootstrap/dist/js/bootstrap',
        Transactions: 'js/views/transactions',
        Exchanges: 'js/views/exchanges',
        CurrenciesView: 'js/views/currencies',
    	IndexView: 'js/views/index',
        Payments: 'js/models/payments',
        Currencies: 'js/models/currencies',
        Conversions: 'js/models/conversions'
    },
    shim: {
    	backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});