'use strict';

const { CoinMarketCap } = require('./../index');

describe('Testing CoinMarketCap Api', () => {

    const coinMarketCap = new CoinMarketCap();

    //coinMarketCap.log = true;

    test('Call the ticker endpoint', () => {
        
        return coinMarketCap.ticker('bitcoin', {
            limit : 10,
            start : 100,
            convert : 'USD' 
        }).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the global endpoint', () => {
        
        return coinMarketCap.global({
            convert : 'USD' 
        }).then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Scrap the table from the home page', () => {
        
        return coinMarketCap.home().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the coins page', () => {
        
        return coinMarketCap.coins().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the total supply page', () => {
        
        return coinMarketCap.totalSupply().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the non mineable page', () => {
        
        return coinMarketCap.nonMineable().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the tokens page', () => {
        
        return coinMarketCap.tokens().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the markets page', () => {
        
        return coinMarketCap.markets('ripple').then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the historical data page', () => {
        
        return coinMarketCap.historicalData().then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

    test('Scrap the table from the exchanges page', () => {
        
        return coinMarketCap.exchanges('bithumb').then( res =>  {
            expect(res).toBeInstanceOf(Array);
        });

    });

});

