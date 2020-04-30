'use strict';

const Market = require('./market');

// ******************** Cryptonator ********************
function Cryptonator() {

	Market.call(this, {
		default : 'https://api.cryptonator.com/api/'
	});
}

Cryptonator.prototype = Object.create(Market.prototype);

Cryptonator.prototype.ticker = function(symbol1, symbol2) {
	
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'usd';

	const uri = this.buildUri(`ticker/${symbol1}-${symbol2}`);

	return this.requestGet(uri);
}

Cryptonator.prototype.full = function(symbol1, symbol2) {
	
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'usd';

	const uri = this.buildUri(`ticker/${symbol1}-${symbol2}`);

	return this.requestGet(uri);
}

Cryptonator.prototype.currencies = function() {

	const uri = this.buildUri(`currencies`);

	return this.requestGet(uri);
}

module.exports = Cryptonator;