# node-crypto-api

[![NPM](https://nodei.co/npm/node-crypto-api.png)](https://nodei.co/npm/node-crypto-api/)

Provide an api to consume data from multiple cryptocurrencies markets:

	1) Cexio
	2) CoinMarketCap
	3) Bittrex
	4) Cryptonator
	5) Kraken

### Kraken

```javascript
const { Kraken } = require('node-crypto-api');

const kraken = new Kraken();

//ticker
kraken.ticker('XBT', 'USD')
    .then(console.log)
    .catch(console.error);
```

### Cexio

```javascript
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

```javascript
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

```javascript
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

```javascript
coinMarketCap.global()
```

Params:

    @ currency  : string
    @ queryString : {
        convert : 'string' 
    }

#### Table scrapping

##### Top 100 currencies

```javascript
coinMarketCap.home()
```

##### All currencies

```javascript
coinMarketCap.all()
```

##### Coins

```javascript
coinMarketCap.coins()
```

##### Get Total Supply

```javascript
coinMarketCap.totalSupply()
```

##### Non Mineable

```javascript
coinMarketCap.nonMineable()
```

##### Tockens

```javascript
coinMarketCap.tokens()
```

##### Markets

```javascript
coinMarketCap.markets()
```
   
Params:

    @ currency  : string

##### Historial Data

```javascript
coinMarketCap.historicalData()
```

Params:

    @ currency  : string
    @ queryString : {
        start : number
        end : number
    }

##### Exchanges

```javascript
coinMarketCap.exchanges()
```
   
Params:

    @ market  : string

### Cryptonator

```javascript
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

```javascript
cryptonator.ticker()
```

Params:

    @ base   : string
    @ target : string

##### Full

Return list of prices from multiple markets 

```javascript
cryptonator.full()

```

##### Currencies

Return a list of the suported currencies

```javascript
cryptonator.currencies()

```

### Bittrex

```javascript
const { Bittrex } = require('node-crypto-api');

const bittrex = new Bittrex();

//ticker
bittrex.getticker('BTC', 'LTC')
    .then(console.log)
    .catch(console.error);
```
