'use strict';

const Market = require('./market');

// ******************** Bittrex ********************
function Bittrex() {  

	Market.call(this, {
		default: 'https://bittrex.com/api/v1.1/'
	});
}

Bittrex.prototype = Object.create(Market.prototype);

Bittrex.prototype.buildMarket = function(symbol1, symbol2) {
	return symbol1 && symbol2
		? `${symbol1}-${symbol2}`
		: "";
}

Bittrex.prototype.getmarkets = function() {

	const uri = this.buildUri(`public/getmarkets`);

	return this.requestGet(uri);
}

Bittrex.prototype.getcurrencies = function() {

	const uri = this.buildUri(`public/getcurrencies`);

	return this.requestGet(uri);
}

Bittrex.prototype.getticker = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	const jsonQs = { 
		market: this.buildMarket(symbol1, symbol2)
	};

	const uri = this.buildUri(`public/getticker`);

	return this.requestGet(uri, jsonQs);
}

Bittrex.prototype.getmarketsummaries = function() {

	const uri = this.buildUri(`public/getmarketsummaries`);

	return this.requestGet(uri);
}

Bittrex.prototype.getmarketsummary = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';
	
	const jsonQs = {
		market : this.buildMarket(symbol2, symbol2) 
	};

	const uri = this.buildUri(`public/getmarketsummary`);

	return this.requestGet(uri, jsonQs);
}

Bittrex.prototype.getorderbook = function(symbol1, symbol2, type) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';
	type = type || 'both';

	const jsonQs = {
		market : this.buildMarket(symbol2, symbol2),
		type: type
	};

	const uri = this.buildUri(`public/getorderbook`);

	return this.requestGet(uri, jsonQs);
}

Bittrex.prototype.getmarkethistory = function(symbol1, symbol2, type) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';
	type = type || 'both';

	const jsonQs = {
		market : this.buildMarket(symbol2, symbol2),
		type: type
	};

	const uri = this.buildUri(`public/getmarkethistory`);

	return this.requestGet(uri, jsonQs);
}

module.exports = Bittrex;