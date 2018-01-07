'use strict';

const { Kraken } = require('./../index');

describe('Testing Kraken Api', () => {
    
    const kraken = new Kraken();

    //brittex.log = true;

    test('Test the buildPair util', () => {
        
        const res = kraken.buildPair('XBT', 'EUR');

        return expect(res).toBe('XBTEUR');

    });

    test('Calls the time endpoint', () => {
        
        return kraken.time().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Calls the assetPairs endpoint', () => {
        
        return kraken.assetPairs('XBT', 'EUR').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Calls the ticker endpoint', () => {
        
        const since = new Date().getTime();

        return kraken.ticker('XBT', 'EUR', since).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Calls the ohlc endpoint', () => {
        
        const since = new Date().getTime();

        return kraken.ohlc('XBT', 'EUR', since, 1).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Calls the orderbook endpoint', () => {

        return kraken.orderbook('XBT', 'EUR', 1).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });


    test('Calls the trades endpoint', () => {
        
        const since = new Date().getTime();

        return kraken.trades('XBT', 'EUR', since).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

});
