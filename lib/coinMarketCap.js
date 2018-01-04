'use strict';

const Market = require('./Market');
const request = require('request');
const cheerio = require('cheerio');

// ******************** CoinMarketCap ********************
function CoinMarketCap() {

	Market.call(this, {
		default: 'https://api.coinmarketcap.com/v1',
		home: 'https://coinmarketcap.com'
	});
}

CoinMarketCap.prototype = Object.create(Market.prototype);

CoinMarketCap.prototype.ticker = function(symbol1, jsonQs) {
	
	symbol1 = symbol1 || 'bitcoin';
	
	return this.requestGet(`ticker/${symbol1}${this.utlis.jsonToQueryString(jsonQs)}`);
}

CoinMarketCap.prototype.global = function(jsonQs) {
	return this.requestGet(`global${this.utlis.jsonToQueryString(jsonQs)}`);
}    

CoinMarketCap.prototype.markets = function(symbol1) {

	symbol1 = symbol1 || 'bitcoin';

	const uri = this.buildUri(`currencies/${symbol1}/#markets`, 'home');

	return new Promise((res, rej) => 

		request(uri, (error, response, body) => {

			if(error) {

				rej(error);
			} else {

				const table = [];

				const $ = cheerio.load(body, { ignoreWhitespace: true });
				
				const $rows = $('table#markets-table tr');

				const rowsLength = $rows.eq(0).children().length;

				console.log(table[0]);
			}
		})
	);
}

module.exports = CoinMarketCap;