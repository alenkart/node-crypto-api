'use strict';

const Market = require('./Market');
const request = require('request');
const cheerio = require('cheerio');

// ******************** CoinMarketCap ********************
function CoinMarketCap() {

	Market.call(this, {
		default: 'https://api.coinmarketcap.com/v1',
		home: 'https://coinmarketcap.com'
	});
}

CoinMarketCap.prototype = Object.create(Market.prototype);

CoinMarketCap.prototype.ticker = function(symbol1, jsonQs) {
	
	symbol1 = symbol1 || 'bitcoin';
	
	return this.requestGet(`ticker/${symbol1}${this.utlis.jsonToQueryString(jsonQs)}`);
}

CoinMarketCap.prototype.global = function(jsonQs) {
	return this.requestGet(`global${this.utlis.jsonToQueryString(jsonQs)}`);
}    

CoinMarketCap.prototype.markets = function(symbol1) {

	symbol1 = symbol1 || 'bitcoin';

	const uri = this.buildUri(`currencies/${symbol1}/#markets`, 'home');

	return this.table(uri, '#markets-table');
}

CoinMarketCap.prototype.historicalData = function(symbol1, start, end) {

	symbol1 = symbol1 || 'bitcoin';

	const uri = this.buildUri(`currencies/${symbol1}/historical-data`, 'home');

	return this.table(uri, '.table', { start, end });
}

CoinMarketCap.prototype.exchanges = function(symbol1) {

	symbol1 = symbol1 || 'bithumb';

	const uri = this.buildUri(`exchanges/${symbol1}`, 'home');

	return this.table(uri, '.table');
}

module.exports = CoinMarketCap;