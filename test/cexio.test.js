'use strict';

const { Cexio } = require('./../index');

describe('Testing Cexio Api', () => {
    
    const cexio = new Cexio();

    //cexio.log = true;

    test('Call the currency limits endpoint', () => {
        
        return cexio.currencyLimits().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the ticker endpoint', () => {
        
        return cexio.ticker('BTC', 'USD').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the tickers endpoint', () => {
        
        return cexio.tickers('USD').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });
    
    test('Call the last prices endpoint', () => {
        
        return cexio.lastPrices('BTC', 'XRP', 'ETH').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the convert endpoint', () => {
        
       return cexio.convert('BTC', 'USD', 2).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the chart endpoint', () => {
        
        return cexio.chart('BTC', 'USD', 24, 100).then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Call the ohlvc endpoint', () => {
        
        return cexio.ohlvc(20180101, 'BTC', 'USD').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the orderbook endpoint', () => {
        
        return cexio.orderbook('BTC', 'USD').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the trade history endpoint', () => {
        
        return cexio.tradeHistory('BTC', 'USD').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Test the socket', () => {

        function socket () {

            const cexioSocket = cexio.socket();

            cexioSocket.send({ "e": "subscribe", "rooms": [ "tickers" ] });

            return new Promise((res, rej) => {

                cexioSocket.onMessage = response => res(response); 

                cexioSocket.onClose = error => rej(error);

                cexioSocket.init();

            });
        }

        return socket()
            .then( res => expect(res)
            .toBe('{"e":"connected"}'));

    });

});


    