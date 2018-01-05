# crypto-api
Provide an api to consume all the public methods from:

	1) Cexio
	2) CoinMarketCap
	3) Bittrex
	4) Cryptonator
	5) Kraken

### Testing the Api
```
const { Cexio, CoinMarketCap, Bittrex, Cryptonator, Kraken } = require('./lib');

kraken = new Kraken();
bittrex = new Bittrex();
cexio = new Cexio();
coinMarketCap = new CoinMarketCap();
cryptonator = new Cryptonator();

kraken.ticker()
	.then(console.log)
	.then(() => cexio.ticker())
	.then(res => console.log('\n\n', res))
	.then(() => cryptonator.ticker())
	.then(res => console.log('\n\n', res))
	.then(() => coinMarketCap.ticker())
	.then(res => console.log('\n\n', res))
	.then(() => bittrex.getticker())
	.then(res => console.log('\n\n', res))
	.then(() => {

cexio
	.socket()
	.send({ "e": "subscribe", "rooms": [ "tickers" ] })
	.init();

	}).catch(console.error);

coinMarketCap.markets('bitcoin').then(console.log).catch(console.log);

coinMarketCap.historicalData('bitcoin', 20171230, 20180105).then(console.log).catch(console.log);

coinMarketCap.exchanges('bithumb').then(console.log).catch(console.log);

```