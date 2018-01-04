'use strict';

const Market = require('./Market');

// ******************** Cryptonator ********************
function Cryptonator() {
	const source = 'https://api.cryptonator.com/api';
	Market.call(this, source);
}

Cryptonator.prototype = Object.create(Market.prototype);

Cryptonator.prototype.ticker = function(symbol1, symbol2) {
	
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'usd';

	return this.requestGet(`ticker/${symbol1}-${symbol2}`);
}

Cryptonator.prototype.full = function(symbol1, symbol2) {
	
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'usd';

	return this.requestGet(`full/${symbol1}-${symbol2}`);
}

module.exports = Cryptonator;