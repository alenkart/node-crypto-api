'use strict';

const Market = require('./market');

// ******************** Cexio ********************
function Cexio() {

	Market.call(this, {
		default: 'https://cex.io/api/',
		ws: 'wss://ws.cex.io/ws/'
	});
}

Cexio.prototype = Object.create(Market.prototype);

Cexio.prototype.currencyLimits = function() {
	
	const uri = this.buildUri(`currency_limits`);

	return this.requestGet(uri);
}

Cexio.prototype.ticker = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const uri = this.buildUri(`ticker/${symbol1}/${symbol2}`);

	return this.requestGet(uri);
}

Cexio.prototype.tickers = function(symbol1) {

	symbol1 = symbol1 || 'USD';

	const uri = this.buildUri(`tickers/${symbol1}`);

	return this.requestGet(uri);
}

Cexio.prototype.lastPrice = function (symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const uri = this.buildUri(`last_price/${symbol1}/${symbol2}`);

	return this.requestGet(uri);
}

Cexio.prototype.lastPrices = function () {

	const currencies = arguments.length > 0
		? [].slice.call(arguments) 
		: ['BTC', 'XRP', 'ETH'];

	const uri = this.buildUri(`last_prices/${currencies.join('/')}`);

	return this.requestGet(uri);
}

Cexio.prototype.convert = function (symbol1, symbol2, amnt) {

	amnt = amnt || 1;
	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const uri = this.buildUri(`convert/${symbol1}/${symbol2}`);

	return this.requestPost(uri, { amnt });
}

Cexio.prototype.chart = function (symbol1, symbol2, lastHours, maxRespArrSize) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const form = {
		lastHours : lastHours || 24,
		maxRespArrSize : maxRespArrSize || 100
	};

	const uri = this.buildUri(`price_stats/${symbol1}/${symbol2}`);

	return this.requestPost(uri, form);
}

/*
	date: "YYYYMMDD"
*/

Cexio.prototype.ohlvc = function (date, symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	if(!date) {
		date = new Date();
		date.setDate(date.getDate() - 1);
		date = date.toISOString().substring(0, 10).replace(/-/g, '');
	}

	const uri = this.buildUri(`ohlcv/hd/${date}/${symbol1}/${symbol2}`);

	return this.requestGet(uri);
}

Cexio.prototype.orderbook = function (symbol1, symbol2, jsonQs) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const uri = this.buildUri(`order_book/${symbol1}/${symbol2}`);

	return this.requestGet(uri, jsonQs);
}

Cexio.prototype.tradeHistory = function (symbol1, symbol2, jsonQs) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const uri = this.buildUri(`trade_history/${symbol1}/${symbol2}`);

	return this.requestGet(uri, jsonQs);
}

module.exports = Cexio;