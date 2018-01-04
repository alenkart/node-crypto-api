'use strict';

const Market = require('./Market');

// ******************** Kraken ********************
function Kraken() {
	const source = 'https://api.kraken.com/0';
	Market.call(this, source);
}

Kraken.prototype = Object.create(Market.prototype);

Kraken.prototype.buildPair = function(symbol1, symbol2) {
	return symbol1 && symbol2 
		? `${(symbol1+symbol2).toUpperCase()}` 
		: "";
}

Kraken.prototype.time = function() {
	return this.requestGet(`public/Time`);
}

Kraken.prototype.assetPairs = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2)
	};

	return this.requestGet(`public/AssetPairs${this.utlis.jsonToQueryString(jsonQs)}`);
}

Kraken.prototype.ticker = function(symbol1, symbol2, since) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
	};

	return this.requestGet(`public/Ticker${this.utlis.jsonToQueryString(jsonQs)}`);
}


Kraken.prototype.ohlc = function(symbol1, symbol2, since, interval) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		since: since || new Date().getTime(), 
		interval: interval || 1,
	};

	return this.requestGet(`public/OHLC${this.utlis.jsonToQueryString(jsonQs)}`);
}

Kraken.prototype.orderbook = function(symbol1, symbol2, count) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		count: count || 1
	};

	return this.requestGet(`public/Depth${this.utlis.jsonToQueryString(jsonQs)}`);
}

Kraken.prototype.trades = function(symbol1, symbol2, since) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		since: since || new Date().getTime() 
	};

	return this.requestGet(`public/Trades${this.utlis.jsonToQueryString(jsonQs)}`);
}

module.exports = Kraken;