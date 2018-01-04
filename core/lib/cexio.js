'use strict';

const WebSocket = require('ws');
const request = require('request');

function Market(restApi, webSocketApi) {
	this.restApi = restApi;
	this.webSocketApi = webSocketApi;
}

Market.prototype.utlis = {
	jsonToQueryString : (json) => {
		return json 
			? "?" + Object.keys(json).map(key => `${key}=${json[key]}`).join('&')
			: ""
	},
}

Market.prototype.requestGet = function(endpoint, form) {

	const uri = this.buildUri(endpoint);

	console.log('URI: ', uri);

	return new Promise((res, rej) =>  
		request(uri, (error, response, body) => {

			if(error) {
				rej({error, message: `Couldn't get ${this.name} data`});
			} else {
				res(JSON.parse(body));
			}
		})
	);
} 

Market.prototype.requestPost = function(endpoint, form) {

	const uri = this.buildUri(endpoint);

	return new Promise((res, rej) => 

		request.post(uri, (error, response, body) => {

			if(error) {
				rej({error, message: `Couldn't get ${this.name} data`});
			} else {
				res(JSON.parse(body));
			}

		}).form(form)

	)
}  


Market.prototype.buildUri = function(endpoint) {
	return `${this.restApi}/${endpoint}`;
}                                 

Market.prototype.socket = function() {

	let open = false;

	let messages = [];

	let ws = new WebSocket(this.webSocketApi);

	const email = new Email();

	return {

		init : function () {
			ws.on('open', this.sendMessages.bind(this));
			ws.on('message', this.onMessage);
			return this;
		},

		onMessage : data => console.log(data),

		send : function (message) {

			const type = typeof message;

			if(type !== 'string' && type !== 'object') {
				throw 'Invalid message type';
			}

			const messageStr = type === 'string' 
				? message 
				: JSON.stringify(message);

			if(!open) {
				messages.push(messageStr);
				console.log(`Added message: ${messageStr}`);
			} else {
				ws.send(messageStr);
			}
		  	
		  	return this;
		},

		sendMessages : function () {
			open = true;
			messages.forEach(this.send);
		},
	}
}

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


// ******************** Cexio ********************
function Cexio() {
	const source = 'https://cex.io/api';
	const sourceWs = 'wss://ws.cex.io/ws/';
	Market.call(this, source, sourceWs);
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

// ******************** Bittrex ********************
function Bittrex() {  
	const source = 'https://bittrex.com/api/v1.1';
	Market.call(this, source);
}

Bittrex.prototype = Object.create(Market.prototype);

Bittrex.prototype.buildMarket = function(symbol1, symbol2) {
	return symbol1 && symbol2
		? `${symbol1}-${symbol2}`
		: "";
}

Bittrex.prototype.getmarkets = function() {
	return this.requestGet(`/public/getmarkets`);
}

Bittrex.prototype.getcurrencies = function() {
	return this.requestGet(`/public/getcurrencies`);
}

Bittrex.prototype.getticker = function(symbol1, symbol2) {

	symbol1 = symbol1 || 'BTC';
	symbol2 = symbol2 || 'LTC';

	const jsonQs = { 
		market: this.buildMarket(symbol1, symbol2)
	};

	return this.requestGet(`public/getticker${this.utlis.jsonToQueryString(jsonQs)}`);
}

Bittrex.prototype.getmarketsummaries = function(symbol1) {
	return this.requestGet(`public/getmarketsummaries`);
}

Bittrex.prototype.getmarketsummary = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getmarketsummary?market=${symbol1}-${symbol2}`);
}

Bittrex.prototype.getorderbook = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getorderbook?market=${symbol1}-${symbol2}&type=both`);
}

Bittrex.prototype.getmarkethistory = function(symbol1, symbol2) {
		
	symbol1 = symbol1 || 'btc';
	symbol2 = symbol2 || 'ltc';

	return this.requestGet(`public/getmarkethistory?market=${symbol1}-${symbol2}`);
}

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

// ******************** Cryptocompare ********************
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

module.exports = {
	Cexio,
	CoinMarketCap,
	Bittrex,
	Cryptonator,
	Kraken
}