const { Cexio, CoinMarketCap, Bittrex, Cryptonator, Kraken } = require('./core/lib/cexio');

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
	.catch(console.error);

// const currencies = require('./core/configs/currencies');

// let updating = false;
// let lastPrices = {};
// let emailsLog = [];

// app.get('/', (req, res) => {	
// 	res.send(lastPrices);
// });

// app.get('/emails', (req, res) => {	
// 	res.send(emailsLog);
// });

// app.listen(port, () => {

// 	const cexioSocket = new CexioSocket();
	
// 	const job = new PriceJob();

// 	job.cb = (res) => {

// 		console.log(`************* Prices updated ************* `);

// 		if(!res.data) return;

// 		updating = true;

// 		res.data.forEach(currency => {

// 			let { pair, last } = currency;

// 			if(!currencies[pair]) return; 

// 			lastPrices[pair] = last;

// 			console.log(`| ${fixString(pair)} | ${fixString(last)}`);
// 		});

// 		updating = false;
// 	};

// 	cexioSocket.onMessage = res => cexioSocket.process(res, currencies, lastPrices, (key, price, log) => {
		
// 		if(!updating) lastPrices[key] = price;

// 		emailsLog.push(log);
// 	});

// 	cexioSocket.send({ "e": "subscribe", "rooms": [ "tickers" ] });

// 	job.init();

// 	cexioSocket.init();

// 	console.log('server is running on port 3000');
// });


