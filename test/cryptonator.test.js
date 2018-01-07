'use strict';

const { Cryptonator } = require('./../index');

describe('Testing Cryptonator Api', () => {

    const cryptonator = new Cryptonator();

    //cryptonator.log = true;

    test('Call the ticker endpoint', () => {
        
        return cryptonator.ticker('btc', 'usd').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the global endpoint', () => {
        
        return cryptonator.full('btc', 'usd').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the currencies endpoint', () => {
        
        return cryptonator.currencies().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

});

