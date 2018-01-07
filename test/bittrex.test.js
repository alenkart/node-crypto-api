'use strict';

const { Bittrex } = require('./../index');

describe('Testing Bittrex Api', () => {
    
    const brittex = new Bittrex();

    //brittex.log = true;

    test('Call the getmarkets endpoint', () => {
        
        return brittex.getmarkets().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the getcurrencies endpoint', () => {
        
        return brittex.getcurrencies().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the getticker endpoint', () => {
        
        return brittex.getticker('btc', 'ltc').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the getmarketsummaries endpoint', () => {
        
        return brittex.getmarketsummaries().then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });


    test('Call the getmarketsummary endpoint', () => {
        
        return brittex.getmarketsummary('btc', 'ltc').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the getorderbook endpoint', () => {
        
        return brittex.getorderbook('btc', 'ltc', 'both').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

    test('Call the getmarkethistory endpoint', () => {
        
        return brittex.getmarkethistory('btc', 'ltc', 'both').then( res =>  {
            expect(res).toBeInstanceOf(Object);
        });

    });

});
