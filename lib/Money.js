"use strict";

function Money(config){
    Object.defineProperties(this, {
        decimals: {
            value: config.decimals,
            writable: false
        },
        prefix: {
            value: config.prefix,
            writable: false
        },
        intValue: {
            value: Number(config.value.replace(/\./g, '')),
            writable: false
        },
        currency: {
            value: config.currency,
            writable: false
        }
    });
}

Money.prototype.format = function(){
    return this.prefix + " " + formatDecimal(this.intValue, this.decimals);
};

Money.prototype.isMoreThan = function(other){
    verifyIsSameCurrency(this, other);
    return this.intValue > other.intValue;
};

Money.prototype.isLessThan = function(other){
    verifyIsSameCurrency(this, other);
    return this.intValue < other.intValue;
};

Money.prototype.plus = function(other){
    verifyIsSameCurrency(this, other);
    var sumValue = this.intValue + other.intValue;
    return newMoney(this, formatDecimal(sumValue, this.decimals));
};

Money.prototype.minus = function(other){
    verifyIsSameCurrency(this, other);
    var sumValue = this.intValue - other.intValue;
    return newMoney(this, formatDecimal(sumValue, this.decimals));
};

Money.prototype.isPositive = function(){
    return this.intValue > 0;
};

Money.prototype.isNegative = function(){
    return this.intValue < 0;
}

Money.prototype.equals = function(other){
    if( this.currency !== other.currency ){
        return false;
    }
    if( this.intValue !== other.intValue ){
        return false;
    }
    return true;
};

Money.toString = function(){
    return "[Money Constructor]";
};

Money.factory = function(currency, config){
    validate(config);
    function Currency(value){
        var money = new Money({
            decimals: config.decimals,
            prefix: config.prefix || '$',
            currency: currency || 'Money',
            value: getFormattedValue(value, config.decimals)
        });
        Object.freeze(money);
        return money;
    }

    Currency.ZERO = Currency(0);
    Currency.raw = function(intValue){
        return Currency( formatDecimal(intValue, config.decimals) );
    };

    return Currency;
};

function validate(config){
    if( config.decimals ){
        if( config.decimals.constructor !== Number || config.decimals < 0){
            throw new Error('Decimals value must be a positive integer');
        }
    }
    else{
        if( config.decimals !== 0 ){
            throw new Error('Decimals value must be a positive integer');
        }
    }
}

function verifyIsSameCurrency(one, other){
    if( one.currency === other.currency ){
        return;
    }
    throw new Error('Cannot interoperate different currencies: [' + one.currency + ' and ' + other.currency + ']');
}

function formatDecimal(intValue, decimals){
    var decimal = intValue / Math.pow( 10, decimals );
    return decimal.toFixed( decimals );
}

function getFormattedValue(value, decimals){
    if( value.constructor === String){
        return value;
    }
    if( value.constructor === Number){
        return value.toFixed(decimals) ;
    }
    throw new Error('Not a valid money value');
}

function newMoney(money, newValue){
    return new Money({
        decimals: money.decimals,
        prefix: money.prefix,
        currency: money.currency,
        value: getFormattedValue(newValue, money.decimals)
    });
}



Object.freeze(Money);

module.exports = Money;