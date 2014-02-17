var Money = require('./lib/Money');


exports.factory = Money.factory;

exports.USD = Money.factory('USD', {
    decimals: 2,
    prefix: 'US$'
});
exports.Dollar = exports.USD;

exports.BRL = Money.factory('BRL', {
    decimals: 2,
    prefix: 'R$'
});

exports.EUR = Money.factory('EUR', {
    decimals: 2,
    prefix: '€'
});
exports.Euro = exports.EUR;

exports.JPY = Money.factory('JPY', {
    decimals: 0,
    prefix: '¥'
});
exports.Yen = exports.JPY;
