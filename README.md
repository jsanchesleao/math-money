Math Money
=========

Math money is a module aimed for safe currency manipulation, by not operating with pure floating points.

Installation
------------

```sh
    npm install math-money
```

Quickstart
----------

```javascript
    var Money = require('math-money');

    var oneDollar = Money.Dollar(1); //create using an integer
    var oneEuro = Money.Euro('12.00'); //create using a string

    var result = Money.Dollar(12).plus( Money.Dollar('10.00') );
    console.log( result.format() ); // US$ 22.00
```

Defining Your Currency
----------------------
```javascript
    var Money = require('math-money');
    var MyCurrency = Money.factory('MyCurrency', {
        decimals: 2,
        prefix: 'My$'
    });

    console.log( MyCurrency(10).format() ); //My$ 10.00
```

To create a custom currency, use <code>Money.factory</code> method. It accepts the currency identifier as first parameter and a config object as second, with the following fields:
- decimals (how many decimal places the currency supports)
- prefix (the prefix to format the currency. Normally you should put the currency symbol)

Operations
----------

Money objects are immutable, so all math operations will not modify the object itself, but return another one.

- Plus
> <code>Money.Dollar(1).plus( Money.Dollar(2) )</code><br>
> Should return a Money.Dollar(3);
- Minus
> <code>Money.Dollar(2).minus( Money.Dollar(1) )</code><br>
> Should return a Money.Dollar(1)
- isMoreThan
> <code>Money.Dollar(2).isMoreThan( Money.Dollar(1) )</code><br>
> Should return a true if money value is bigger that the compared one
- isLessThan
> <code>Money.Dollar(1).isLessThan( Money.Dollar(2) )</code><br>
> Should return a true if money value is lower that the compared one
- equals
> <code>Money.Dollar(1).equals( Money.Dollar(1) )</code><br>
> Should return a true if money value and the compared one are equal

Different currencies cannot interoperate. If you try to add, subtract or compare different currencies, an exception will be thrown.

Convenience Methods
-------------------

- Currency.raw

```javascript
    var Money = require('math-money');
    Money.Dollar.raw( 2000 ); // US$ 20.00
    Money.Yen.raw(2000); // ¥ 2000
```
This generates a Money object built with a raw integer value. This value will then be converted to decimal if needed.

- Currency.ZERO

```javascript
    var Money = require('math-money');
    Money.Dollar.ZERO; // US$ 0.00
    Money.BRL.ZERO; // R$ 0.00
    Money.Yen.ZERO; // ¥ 0
```

Returns a money value representing no money.


Built in currencies
-------------------

math-currency currently supports these currencies out of the box:

- Brazilian Real <code>Money.BRL</code>
- Euro <code>Money.Euro or Money.EUR</code>
- Japanese Yen <code>Money.Yen or Money.JPY</code>
- US Dollar <code>Money.Dollar or Money.USD)</code>
