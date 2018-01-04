const Market = require('./market');
const Cexio = require('./cexio');
const Kraken = require('./kraken');
const Bittrex = require('./bittrex');
const Cryptonator = require('./cryptonator');
const CoinMarketCap = require('./coinMarketCap');


coinMarketCap = new CoinMarketCap();

coinMarketCap.markets().then(console.log).catch(console.log);

module.exports = {
	Market,
	Cexio,
	Kraken,
	Bittrex,
	Cryptonator,
	CoinMarketCap,
}