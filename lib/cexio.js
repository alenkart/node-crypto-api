'use strict';

const Market = require('./Market');

// ******************** Cexio ********************
function Cexio() {

	Market.call(this, {
		default: 'https://cex.io/api',
		ws: 'wss://ws.cex.io/ws/'
	});
}

Cexio.prototype = Object.create(Market.prototype);

Cexio.prototype.currencyLimits = function() {
	return this.requestGet(`currency_limits`);
}

Cexio.prototype.ticker = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestGet(`ticker/${symbol1}/${symbol2}`);
}

Cexio.prototype.tickers = function(symbol1) {

	symbol1 = symbol1 || 'USD';

	return this.requestGet(`tickers/${symbol1}`);
}

Cexio.prototype.lastPrice = function (symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestGet(`last_price/${symbol1}/${symbol2}`);
}

Cexio.prototype.lastPrices = function () {

	const currencies = arguments.length > 0
		? [].slice.call(arguments) 
		: ['BTC', 'XRP', 'ETH'];

	return this.requestGet(`last_prices/${currencies.join('/')}`);
}

Cexio.prototype.convert = function (amnt, symbol1, symbol2) {

	amnt = amnt || 1;
	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestPost(`convert/${symbol1}/${symbol2}`, { amnt });
}

Cexio.prototype.chart = function (symbol1, symbol2, form) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	form = form || {};
	form['lastHours'] = form['lastHours'] || 24;
	form['maxRespArrSize'] = form['maxRespArrSize'] || 5;

	return this.requestPost(`price_stats/${symbol1}/${symbol2}`, form);
}

/*
	date: "YYYYMMDD"
*/

Cexio.prototype.ohlvc = function (symbol1, symbol2, date) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	if(!date) {
		date = new Date();
		date.setDate(date.getDate() - 1);
		date = date.toISOString().substring(0, 10).replace(/-/g, '');
	}

	console.log(date);

	return this.requestGet(`ohlcv/hd/${date}/${symbol1}/${symbol2}`);
}

Cexio.prototype.orderbook = function (symbol1, symbol2, date) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestGet(`order_book/${symbol1}/${symbol2}`);
}

Cexio.prototype.tradeHistory = function (symbol1, symbol2, date) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestGet(`trade_history/${symbol1}/${symbol2}`);
}

module.exports = Cexio;