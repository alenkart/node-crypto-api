# cryptoMailer
Send a email when a cryptocurrency reach a rate

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
```

### Rate configuration
core / configs / currencies.json

### Email configuration
core / configs / email.json
