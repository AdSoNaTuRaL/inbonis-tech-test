const _ = require('lodash');

const value = process.argv.slice(2)[0];

const fn1 = (x) => x + 1;
const fn2 = (x) => x + 2;
const fn3 = (x) => x * 2;
const fn4 = (x) => x / 2;

// using lodash
const compose = _.flowRight([fn1, fn2, fn3, fn4, fn2, fn3, fn1]);

const result = compose(parseInt(value, 10));

console.log(result);
