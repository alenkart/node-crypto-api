'use strict';

const { Cryptonator } = require('./../index');

describe('Testing Cryptonator Api', () => {

    const cryptonator = new Cryptonator();

    cryptonator.log = true;

    test('Call the ticker endpoint', () => {
        
        cryptonator.ticker('btc', 'usd').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the global endpoint', () => {
        
        cryptonator.full('btc', 'usd').then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

    test('Call the currencies endpoint', () => {
        
        cryptonator.currencies().then( res =>  {

            expect(res).toBeInstanceOf(Object);
    
        }).catch(console.error);

    });

});

