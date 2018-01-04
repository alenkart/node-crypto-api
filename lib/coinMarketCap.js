'use strict';

const Market = require('./Market');

// ******************** CoinMarketCap ********************
function CoinMarketCap() {
	const source = 'https://api.coinmarketcap.com/v1';
	Market.call(this, source);
}

CoinMarketCap.prototype = Object.create(Market.prototype);

CoinMarketCap.prototype.ticker = function(symbol1, jsonQs) {
	
	symbol1 = symbol1 || 'bitcoin';
	
	return this.requestGet(`ticker/${symbol1}${this.utlis.jsonToQueryString(jsonQs)}`);
}

CoinMarketCap.prototype.global = function(jsonQs) {
	return this.requestGet(`global${this.utlis.jsonToQueryString(jsonQs)}`);
}

module.exports = CoinMarketCap;