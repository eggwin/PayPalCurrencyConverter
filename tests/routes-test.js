var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	request = require('supertest'),
	express = require('express'),
	app = require('../app'),
	expect = chai.expect;

chai.use(sinonChai);

describe('@@Endpoints@@', function () {
	it('makes a GET request to root and returns a 200 http status code', function () {
		request(app).get('/').expect(200, function (err) {
			console.log(err);
		});
	});
	it('makes a GET request to /paypal/currencyList and returns a 200 http status code', function () {
		request(app).get('/paypal/currencyList').expect(200, function (err) {
			console.log(err);
		});
	});
	it('makes a GET request to /paypal/activity and returns a 200 http status code', function () {
		request(app).get('/paypal/activity').expect(200, function (err) {
			console.log(err);
		});
	});
	it('makes a GET request to /paypal/createNewTransaction and returns a 200 http status code', function () {
		request(app).get('/paypal/createNewTransaction').expect(200, function (err) {
			console.log(err);
		});
	});
	it('makes a GET requst to /paypal/createNewTransaction', function () {
		request(app).get('/paypal/createNewTransaction').expect(200, function (err) {
			console.log(err);
		});
	});
});

describe('Transaction Creation', function () {
	it('successfully returns an ID for the new transaction', function () {
		request(app).get('/paypal/createNewTransaction').expect(200, function (err) {
			console.log('ERROR: ', err);
		}).end(function (err, res) {
			console.log('err', err, 'res', res);
			if (err) {
				throw err;
			}
			expect(res.body).to.have.property('id');
		});
	});
});