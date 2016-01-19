var express = require('express'),
	http = require('http'),
	router = express.Router(),
	path = require('path'),
	paypal = require('paypal-rest-sdk'),
	oxr = require('open-exchange-rates'),
	fx = require('money'),
	fs = require('fs'),
	moment = require('moment'),
	entities = require('entities'),
	_ = require('underscore'),
	currencyConverter = require('awesomelysimplecurrencyconverter'),
	currSymbols = require('../public/js/lib/symbols.json');

// configure open exchange rates
oxr.set({
	app_id: '21e2a699f2d0435a81ba9b428c70f7a4'
});

// configure paypal
paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AbSXDKVBI1ANmIArruCrmBY_8U4BawYoJc16DgAYca8il8u8mNUMh8BQ0OXR2Adi3Gm5xpCV554eKjWR',
  'client_secret': 'EDbgKyZavJtOsMNRPxZpNiUDfAuP8-6Vl6lebwZt_7SV_7hAWCpUJ7WiMAmfi20mNO8LP6RjHcGlOnE4'
});

function randomInt (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function PaymentDetails (intent) {
	this.intent = intent;
	this.payer = {
		payment_method: 'credit_card',
		funding_instruments: {credit_card: new CreditCard()}
	};
	this.transactions = new Transaction('USD');
}

function CreditCard () {
	this.type = randomInt(1,10) >= 5 ? 'visa' : 'mastercard';
	this.number = randomInt(1000000000000000, 9999999999999999);
	this.expire_year = randomInt(2016, 2023);
	this.cvv2 = randomInt(100, 999);
	this.first_name = "Test";
	this.last_name = "Testington";
	this.billing_address = {
		line1: randomInt(1, 99999) + ' Test Dr',
		city: 'Testopolis',
		state: 'Testing',
		postal_code: randomInt(10000, 99999),
		country_code: 'US'
	}
}

function Transaction (currency) {
	var subtotal = randomInt(0, 999),
		tax = subtotal * 0.0875,
		shipping = randomInt(0, 10),
		total = subtotal + tax + shipping;
	this.amount = {
		total: total,
		currency: currency,
		details: {
			subtotal: subtotal,
			tax: tax,
			shipping: shipping
		},
		description: "A random payment"
	}
}

PaymentDetails.prototype.addTransaction = function () {
	console.log(this.transactions);
	// this.transactions.push(new Transaction());
}

var newPayment = new PaymentDetails();

router.get('/', function (req, res) {
	console.log('GET call to /');
	res.render('layouts/master');
});

router.get('/paypal/createNewTransaction', function (req, res) {
	var payment_details = {
		"intent": "sale",
		"payer": {
			"payment_method": "credit_card",
			"funding_instruments": [{
				"credit_card": {
					"type": "visa",
					"number": "4032037527611095",
					"expire_month": "06",
					"expire_year": "2020",
					"cvv2": "874",
					"first_name": "Eggwin",
					"last_name": "McEggerton",
					"billing_address": {
						"line1": "3800 N Capital of Texas Hwy",
						"city": "Austin",
						"state": "TX",
						"postal_code": "78746",
						"country_code": "US" 
					}
				}
			}]
		},
		"transactions": [{
			"amount": {
				"total": "10000.00",
				"currency": "EUR",
				"details": {
					"subtotal": "10000.00",
					"tax": "0.00",
					"shipping": "0.00"
				}
			},
			"description": "Annual Dues"
		}]
	};
	paypal.payment.create(payment_details, function (err, payment) {
		if(err){
			console.error(err);
		} else {
			res.send(payment);
		}
	});
});

router.get('/paypal/activity', function (req, res) {
	// retrieve transaction history
	console.log('GET call to /paypal/activity');
	paypal.payment.list({ "count": 10 }, function (error, payment_history){
		if(error){
			console.log(error.response);
			res.send(error);
		} else {
			// map the symbols with the payments retrieved
			_(payment_history.payments).each(function (v, k) {
				_(v.transactions).each(function (value, key) {
					value.amount.symbol = currSymbols[value.amount.currency] || currSymbols['ZZZ'];
				});
			});
			res.send(payment_history);
		}
	});
});

router.get('/paypal/currencyList', function (req, res) {
	console.log('GET call to /paypal/currencyList');
	var currenciesPath = path.join(__dirname, '../public/js/lib/currencies.txt'),
		symbolsPath = path.join(__dirname, '../public/js/lib/symbols.json');

	oxr.latest(function (err) {
		if (err) {
			// something went wrong, use locally stored rates from last success
			console.error( 'ERROR loading rates from API! Error was:', error.toString());
			console.info('Defaulting to backup rates stored locally');
			fs.readFile(currenciesPath, function (err, data) {
				fx.rates = data.rates;
				fx.base = data.base;
				// read symbols file
				fs.readFile(symbolsPath, function (err, symbolsData) {
					if (err) {
						return console.log(err);
					}
					res.send([oxr, symbolsData]);
				});
			});
			return false;
		}
		// write rates out to local file
		fs.writeFile(currenciesPath, JSON.stringify(oxr.rates), function (err) {
			if (err) {
				return console.log(err);
			}
		});
		// load rates into fx for currency conversion
		fx.rates = oxr.rates;
		fx.base = oxr.base;
		// read symbols from file
		fs.readFile(symbolsPath, function (err, symbolsData) {
			var symbols = JSON.parse(symbolsData);
			if (err) {
				return console.log(err);
			} else {
				var mappedCurrencies = _(oxr.rates).mapObject(function (v, k) {
					return symbols[k] + v;
				});
				oxr.mappedCurrencies = mappedCurrencies;
				oxr.formatted = moment.unix(oxr.timestamp/1000).format('MMMM DD, YYYY h:mm:ss a');;
			}
			res.send(oxr);
		});
	});
});

router.get('/paypal/currencyConversion/:amount/:c1/:c2', function (req, res) {
	var currConvert = currencyConverter.convert;
	currConvert(req.params.amount, req.params.c1, req.params.c2, function (result) {
		var amount = result.converted,
			symbolFrom = result.symbolFrom,
			symbolTo = result.symbolTo;
		res.send({
			converted: amount,
			symbolFrom: symbolFrom,
			symbolTo: symbolTo
		});
	});
});

module.exports = router;
