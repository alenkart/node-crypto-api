'use strict';

const { Cexio } = require('./../index');

describe('Testing Cexio Api', () => {
    
    const cexio = new Cexio();

    cexio.log = true;

    test('Call the currency limits endpoint', () => {
        
        cexio.currencyLimits().then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the ticker endpoint', () => {
        
        cexio.ticker('BTC', 'USD').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the tickers endpoint', () => {
        
        cexio.tickers('USD').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });
    
    test('Call the last prices endpoint', () => {
        
        cexio.lastPrices('BTC', 'XRP', 'ETH').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the convert endpoint', () => {
        
        cexio.convert('BTC', 'USD', 2).then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the chart endpoint', () => {
        
        cexio.chart('BTC', 'USD', 24, 100).then( res =>  {

            expect(res).toBeInstanceOf(Array);
    
        }).catch(console.error);

    });

    test('Call the ohlvc endpoint', () => {
        
        cexio.ohlvc(20180101, 'BTC', 'USD').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the orderbook endpoint', () => {
        
        cexio.orderbook('BTC', 'USD').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the trade history endpoint', () => {
        
        cexio.tradeHistory('BTC', 'USD').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

});

describe('Test the Cexio socket', () => {

    const cexio = new Cexio();

    cexio.log = true;
    
    const cexioSocket = cexio.socket();

    cexioSocket.send({ "e": "subscribe", "rooms": [ "tickers" ] });

    cexioSocket.onMessage = function(res) {

        res = JSON.parse(res);
       
        expect(res).toBeInstanceOf(Object);
    }

    cexioSocket.init();
})
    
    