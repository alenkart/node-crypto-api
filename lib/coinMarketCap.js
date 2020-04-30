'use strict';

const Market = require('./market');
const request = require('request');
const cheerio = require('cheerio');

// ******************** CoinMarketCap ********************
function CoinMarketCap() {

	Market.call(this, {
		default: 'https://api.coinmarketcap.com/v1/',
		home: 'https://coinmarketcap.com/'
	});
}

CoinMarketCap.prototype = Object.create(Market.prototype);

CoinMarketCap.prototype.ticker = function(currency, jsonQs) {
	
	currency = currency || 'bitcoin';

	const uri = this.buildUri(`ticker/${currency}`);

	return this.requestGet(uri, jsonQs);
}

CoinMarketCap.prototype.global = function(jsonQs) {

	const uri = this.buildUri(`global`);

	return this.requestGet(uri, jsonQs);
}    

//table

CoinMarketCap.prototype.home = function() {
	
	const uri = this.buildUri(``, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.all = function() {
	
	const uri = this.buildUri(`coins/views/all`, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.coins = function() {
	
	const uri = this.buildUri(`coins`, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.totalSupply = function() {
	
	const uri = this.buildUri(`coins/views/market-cap-by-total-supply`, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.nonMineable = function() {
	
	const uri = this.buildUri(`coins/views/filter-non-mineable`, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.tokens = function() {
	
	const uri = this.buildUri(`tokens`, 'home');
	
	return this.table(uri, '.table');
}

CoinMarketCap.prototype.markets = function(currency) {

	currency = currency || 'bitcoin';

	const uri = this.buildUri(`currencies/${currency}/#markets`, 'home');

	return this.table(uri, '#markets-table');
}

CoinMarketCap.prototype.historicalData = function(currency, jsonQs) {

	currency = currency || 'bitcoin';

	const queryString = this.utlis.jsonToQueryString(jsonQs);

	const uri = this.buildUri(`currencies/${currency}/historical-data`, 'home');

	return this.table(uri, '.table', jsonQs);
}

CoinMarketCap.prototype.exchanges = function(market) {

	market = market || 'bithumb';

	const uri = this.buildUri(`exchanges/${market}`, 'home');

	return this.table(uri, '.table');
}

module.exports = CoinMarketCap;