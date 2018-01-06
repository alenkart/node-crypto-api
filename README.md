# node-crypto-api

[![NPM](https://nodei.co/npm/node-crypto-api.png)](https://nodei.co/npm/node-crypto-api/)

Provide an api to consume data from multiple cryptocurrencies markets:

	1) Cexio
	2) CoinMarketCap
	3) Bittrex
	4) Cryptonator
	5) Kraken

### Kraken

```
const { Kraken } = require('node-crypto-api');

const kraken = new Kraken();

//ticker
kraken.ticker('XBT', 'USD')
    .then(console.log)
    .catch(console.error);
```

### Cexio

```
const { Cexio } = require('node-crypto-api');

const cexio = new Cexio();

//ticker
cexio.ticker('BTC', 'USD')
    .then(console.log)
    .catch(console.error);

//socket
const cexioSocket = cexio.socket();

cexioSocket.send({ "e": "subscribe", "rooms": [ "tickers" ] });

cexioSocket.onMessage = function(res) {
	console.log(JSON.parse(res));
}

cexioSocket.init();
```

### CoinMarketCap

```
const { CoinMarketCap } = require('node-crypto-api');

const coinMarketCap = new CoinMarketCap();

//ticker
coinMarketCap.ticker('bitcoin')
    .then(console.log)
    .catch(console.error);

//tables scrapping
coinMarketCap.markets('bitcoin')
    .then(console.log)
    .catch(console.error);

coinMarketCap.historicalData('bitcoin', { start : 20171230, end : 20180105 })
    .then(console.log)
    .catch(console.error);

coinMarketCap.exchanges('bithumb')
    .then(console.log)
    .catch(console.error);
```

#### Rest Api

##### Ticker

```
coinMarketCap.ticker()
```

Params:

    @ currency  : string
    @ queryString : {
        limit : number
        start : number
        convert : 'string' 
    }

##### Global

```
coinMarketCap.global()
```

Params:

    @ currency  : string
    @ queryString : {
        convert : 'string' 
    }

#### Table scrapping

##### Top 100 currencies

```
coinMarketCap.home()
```

##### All currencies

```
coinMarketCap.all()
```

##### Coins

```
coinMarketCap.coins()
```

##### Get Total Supply

```
coinMarketCap.totalSupply()
```

##### Non Mineable

```
coinMarketCap.nonMineable()
```

##### Tockens

```
coinMarketCap.tokens()
```

##### Markets

```
coinMarketCap.markets()
```
   
Params:

    @ currency  : string

##### Historial Data

```
coinMarketCap.historicalData()
```

Params:

    @ currency  : string
    @ queryString : {
        start : number
        end : number
    }

##### Exchanges

```
coinMarketCap.exchanges()
```
   
Params:

    @ market  : string

### Cryptonator

```
const { Cryptonator } = require('node-crypto-api');

const cryptonator = new Cryptonator();

//ticker
cryptonator.ticker('btc', 'usd')
    .then(console.log)
    .catch(console.error);
```

#### Rest Api

##### Ticker

Return the the price, volume and price change

```
cryptonator.ticker()

```

Params:

    @ base   : string
    @ target : string

##### Full

Return list of prices from multiple markets 

```
cryptonator.full()

```

##### Currencies

Return a list of the suported currencies

```
cryptonator.currencies()

```

### Bittrex

```
const { Bittrex } = require('node-crypto-api');

const bittrex = new Bittrex();

//ticker
bittrex.getticker('BTC', 'LTC')
    .then(console.log)
    .catch(console.error);
```