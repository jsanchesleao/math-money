"use strict";
/*global describe, it*/

var Money = require('../lib/Money');
var assert = require('assert');

var Dollar = Money.factory('USD', {
    decimals: 2,
    prefix: "US$"
});


describe('Money', function(){
    describe('Creation', function(){
        it('generates currency constructors based on config', function(){
            var BRL = Money.factory('BRL', {
                decimals: 2,
                prefix: "R$"
            });

            var price = BRL('15.50');
            assert.equal(price.format(), 'R$ 15.50');
            assert.equal(price.currency, 'BRL');
        });

        it('throws error if decimals value is not a positive number', function(){
            try{
                Money.factory('FakeDollar', {
                    decimals: 'i am not a number',
                    prefix: 'US$'
                });
            }
            catch(err){
                assert.equal(err.message, 'Decimals value must be a positive integer');
            }
        });

        it('can be created with a string', function(){
            var price = Dollar('12.00');
            assert.equal(price.format(), 'US$ 12.00');
        });

        it('can be created with a number', function(){
            var price = Dollar(12.00);
            assert.equal(price.format(), 'US$ 12.00');

            var price2 = Dollar(0.5);
            assert.equal(price2.format(), 'US$ 0.50');
        });

        it('can be created with a raw intValue', function(){
            var price = Dollar.raw(120);
            assert.equal(price.format(), 'US$ 1.20');
        });

        it('generates immutable objects', function(){
            var price = Dollar('10.00');
            try{
                price.intValue = 1200;
                assert.fail('variable should be immutable');
            }
            catch(err){
                assert.equal(err.type, 'strict_read_only_property');
            }
        });
    });

    describe('Operations', function(){
        it('makes objects of the same currency and value equal', function(){
            var ten = Dollar('10.00');
            var tenAgain = Dollar('10.00');

            assert.ok( ten.equals(tenAgain) );
        });

        it('compares objects', function(){
            var ten = Dollar('10.00');
            var five = Dollar('5.00');
            assert.ok( ten.isMoreThan(five) );
            assert.ok( five.isLessThan(ten) );
        });

        it('sums values of objects', function(){
            var oneDollar = Dollar(1);
            var fiveDollars = Dollar(5);

            assert.ok( Dollar(6).equals( oneDollar.plus(fiveDollars) ) );
        });

        it('subtracts values of objects', function(){
            var oneDollar = Dollar(1);
            var fiveDollars = Dollar(5);

            assert.ok( Dollar(4).equals( fiveDollars.minus(oneDollar) ) );
        });

        it('cannot interoperate different currencies', function(){
            var BRL = Money.factory('BRL',{
                decimals: 2,
                prefix: 'R$'
            });
            try{
                Dollar(1).plus(BRL(1));
                assert.fail();
            }
            catch(err){
                assert.equal(err.message, 'Cannot interoperate different currencies: [USD and BRL]');
            }
        });

        it('verifies if value is positive, negative or zero', function(){
            var oneDollar = Dollar(1);
            var zeroDollar = Dollar.ZERO;
            var minusOneDollar = Dollar(-1);

            assert.ok( oneDollar.isPositive() );
            assert.ok( !oneDollar.isNegative() );
            assert.ok( !zeroDollar.isPositive() );
            assert.ok( !zeroDollar.isNegative() );
            assert.ok( !minusOneDollar.isPositive() );
            assert.ok( minusOneDollar.isNegative() );
        });

    });
});
