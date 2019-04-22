'use strict';

const Market = require('./market');

// ******************** Kraken ********************
function Kraken() {

	Market.call(this, {
		default : 'https://api.kraken.com/0/'
	});
}

Kraken.prototype = Object.create(Market.prototype);

Kraken.prototype.buildPair = function(symbol1, symbol2) {
	return symbol1 && symbol2 
		? `${(symbol1+symbol2).toUpperCase()}` 
		: "";
}

Kraken.prototype.time = function() {

	const uri = this.buildUri(`public/Time`);

	return this.requestGet(uri);
}

Kraken.prototype.assetPairs = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2)
	};

	const uri = this.buildUri(`public/AssetPairs`);

	return this.requestGet(uri, jsonQs);
}

Kraken.prototype.ticker = function(symbol1, symbol2, since) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		since: since || new Date().getTime(), 
	};

	const uri = this.buildUri(`public/Ticker`);

	return this.requestGet(uri, jsonQs);
}


Kraken.prototype.ohlc = function(symbol1, symbol2, since, interval) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		since: since || new Date().getTime(), 
		interval: interval || 1,
	};

	const uri = this.buildUri(`public/OHLC`);

	return this.requestGet(uri, jsonQs);
}

Kraken.prototype.orderbook = function(symbol1, symbol2, count) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		count: count || 1
	};

	const uri = this.buildUri(`public/Depth`);

	return this.requestGet(uri, jsonQs);
}

Kraken.prototype.trades = function(symbol1, symbol2, since) {

	symbol1 = symbol1 || 'XBT';
	symbol2 = symbol2 || 'EUR';

	const jsonQs = { 
		pair: this.buildPair(symbol1, symbol2),
		since: since || new Date().getTime() 
	};

	const uri = this.buildUri(`public/Trades`);

	return this.requestGet(uri, jsonQs);
}

module.exports = Kraken;