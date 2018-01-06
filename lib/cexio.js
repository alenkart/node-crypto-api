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

Cexio.prototype.convert = function (symbol1, symbol2, amnt) {

	amnt = amnt || 1;
	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	return this.requestPost(`convert/${symbol1}/${symbol2}`, { amnt });
}

Cexio.prototype.chart = function (symbol1, symbol2, lastHours, maxRespArrSize) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const form = {
		lastHours : lastHours || 24,
		maxRespArrSize : maxRespArrSize || 100
	};

	return this.requestPost(`price_stats/${symbol1}/${symbol2}`, form);
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

	return this.requestGet(`ohlcv/hd/${date}/${symbol1}/${symbol2}`);
}

Cexio.prototype.orderbook = function (symbol1, symbol2, jsonQs) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const queryString = this.utlis.jsonToQueryString(jsonQs);

	return this.requestGet(`order_book/${symbol1}/${symbol2}${queryString}`);
}

Cexio.prototype.tradeHistory = function (symbol1, symbol2, jsonQs) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'USD';

	const queryString = this.utlis.jsonToQueryString(jsonQs);

	return this.requestGet(`trade_history/${symbol1}/${symbol2}${queryString}`);
}

module.exports = Cexio;