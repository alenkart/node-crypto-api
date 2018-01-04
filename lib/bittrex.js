'use strict';

const Market = require('./Market');

// ******************** Bittrex ********************
function Bittrex() {  

	Market.call(this, {
		default: 'https://bittrex.com/api/v1.1'
	});
}

Bittrex.prototype = Object.create(Market.prototype);

Bittrex.prototype.buildMarket = function(symbol1, symbol2) {
	return symbol1 && symbol2
		? `${symbol1}-${symbol2}`
		: "";
}

Bittrex.prototype.getmarkets = function() {
	return this.requestGet(`/public/getmarkets`);
}

Bittrex.prototype.getcurrencies = function() {
	return this.requestGet(`/public/getcurrencies`);
}

Bittrex.prototype.getticker = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'LTC';

	const jsonQs = { 
		market: this.buildMarket(symbol1, symbol2)
	};

	return this.requestGet(`public/getticker${this.utlis.jsonToQueryString(jsonQs)}`);
}

Bittrex.prototype.getmarketsummaries = function(symbol1) {
	return this.requestGet(`public/getmarketsummaries`);
}

Bittrex.prototype.getmarketsummary = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getmarketsummary?market=${symbol1}-${symbol2}`);
}

Bittrex.prototype.getorderbook = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getorderbook?market=${symbol1}-${symbol2}&type=both`);
}

Bittrex.prototype.getmarkethistory = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getmarkethistory?market=${symbol1}-${symbol2}`);
}

module.exports = Bittrex;