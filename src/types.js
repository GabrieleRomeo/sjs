'use strict';

import F from './functional';

/**********************************************************************
 *
 *                     Default Type safety
 *
 * Using the typeOf function through the API, a user can define his/her
 * data types
 **********************************************************************/

// Primitives

/**
 * Checks if the provided Data Type is a String. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {String} arg -  A string
 * @returns {String} The same value without any changes.
 * @example
 * // returns 'Hello World'
 * sjs.types.str('Hello World');
 *
 * // throws TypeError - Error: expected STRING but provided ARRAY
 * sjs.types.str([]);
 *
 * // returns 'hello world'
 * sjs.types.str('Hello World').toLowerCase();
 */
const str  = typeOf('string');

/**
 * Checks if the provided Data Type is a Number. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Number} arg -  A Number (an Integer or a Float)
 * @returns {Number} The same value without any changes.
 * @example
 * // returns 123.100
 * sjs.types.num(123.100);
 *
 * // returns 5
 * sjs.types.num(5);
 *
 * // throws TypeError - Error: expected NUMBER but provided ARRAY
 * sjs.types.num([]);
 */
const num  = typeOf('number');

/**
 * Checks if the provided Data Type is an Integer. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Integer} arg -  An Integer
 * @returns {Integer} The same value without any changes.
 * @example
 * // returns 1
 * sjs.types.int(1);
 *
 * // throws TypeError - Error: expected INTEGER but provided NUMBER
 * sjs.types.int(2.2);
 */
const int  = typeOf('integer');

/**
 * Checks if the provided Data Type is a Function. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Function} arg -  A Function
 * @returns {Function} The same value without any changes.
 * @example
 * // returns function callback() {}
 * sjs.types.fun(function callback() {});
 *
 * // throws TypeError - Error: expected FUNCTION but provided NUMBER
 * sjs.types.fun(2);
 */
const fun  = typeOf('function');

/**
 * Checks if the provided Data Type is a Boolean. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Boolean} arg -  A Boolean
 * @returns {Boolean} The same value without any changes.
 * @example
 * // returns true
 * sjs.types.bool(true);
 *
 * // throws TypeError - Error: expected BOOLEAN but provided STRING
 * sjs.types.bool('Hi!');
 */
const bool = typeOf('boolean');

/**
 * Checks if the provided Data Type is a Date. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Date} arg -  A Date
 * @returns {Date} The same value without any changes.
 * @example
 * // returns Tue Jan 31 2017 01:00:00 GMT+0100 (CET)
 * sjs.types.date(new Date('2017-01-31'));
 *
 * // throws TypeError - Error: expected DATE but provided STRING
 * sjs.types.date('hello');
 */
const date = typeOf('Date');

/**
 * Checks if the provided Data Type is an Object. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Object} arg -  An Object
 * @returns {Object} The same value without any changes.
 * @example
 * // returns {number: 10, color: 'red'}
 * sjs.types.obj({number: 10, color: 'red'});
 *
 * // throws TypeError - Error: expected OBJECT but provided DATE
 * sjs.types.obj(new Date());
 */
const obj = typeOf('Object');

/**
 * Checks if the provided Data Type is an Array. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Array} arg -  An Array
 * @returns {Array} The same value without any changes.
 * @example
 * // returns [1, 2, 4]
 * sjs.types.arr([1, 2, 4]);
 *
 * // throws TypeError - Error: expected ARRAY but provided DATE
 * sjs.types.arr(new Date());
 */
const arr = typeOf('Array');

/**
 * Checks if the provided Data Type is a Symbol. Otherwise the System throws a
 * TypeError
 * @memberof types
 * @function
 * @param {Symbol} arg -  A Symbol
 * @returns {Symbol} The same value without any changes.
 * @example
 * // returns Symbol(foo)
 * sjs.types.sym(Symbol('foo'));
 *
 * // throws TypeError - Error: expected SYMBOL but provided STRING
 * sjs.types.sym('symbol');
 */
const sym = typeOf('Symbol');

/**
 * Checks if the provided Data Type is a Regular Expression. Otherwise the
 * System throws a TypeError
 * @memberof types
 * @function
 * @param {RegExp} arg -  A RegExp
 * @returns {RegExp} The same value without any changes.
 * @example
 * // returns /abc/i
 * sjs.types.regex(/abc/i);
 *
 * // throws TypeError - Error: expected REGEXP but provided NUMBER
 * sjs.types.regex(000);
 */
const regex = typeOf('RegExp');

/**
 * Checks if the provided Data Type is an HTML Node. Otherwise the
 * System throws a TypeError
 * @memberof types
 * @function
 * @param {Node} arg -  An HTML Node
 * @returns {Node} The same value without any changes.
 * @example
 * // returns <body>...</body>
 * sjs.types.HTMLNode(document.querySelector('body'));
 *
 * // throws TypeError - Error: expected HTMLNODE but provided NUMBER
 * sjs.types.HTMLNode(10);
 */
const HTMLNode = typeOf('HtmlNode');

/**
 * Checks if the provided Data Type is an HTML NodeList. Otherwise the
 * System throws a TypeError
 * @memberof types
 * @function
 * @param {NodeList} arg -  An HTML NodeList
 * @returns {NodeList} The same value without any changes.
 * @example
 * // returns a NodeList containing all the page's DIVs
 * sjs.types.HTMLNodeList(document.querySelectorAll('DIV'));
 *
 * // throws TypeError - Error: expected NODELIST but provided NUMBER
 * sjs.types.HTMLNodeList(10);
 */
const HTMLNodeList = typeOf('NodeList');

/**
 * Checks if the provided Data Type is a DocumentFragment. Otherwise the System
 * throws a TypeError
 * @memberof types
 * @function
 * @param {DocumentFragment} arg -  A DocumentFragment
 * @returns {DocumentFragment} The same value without any changes.
 * @example
 * // returns #document-fragment
 * sjs.types.HTMLFragment(document.createDocumentFragment());
 *
 * // throws TypeError - Error: expected DOCUMENTFRAGMENT but provided STRING
 * sjs.types.HTMLFragment('document');
 */
const HTMLFragment = typeOf('DocumentFragment');

/**
  * Allows the User to define a new identity function for a custom Data Type
  * @memberof types
  * @param {String} - The Data Type's name
  * @returns {Function} - A function which validates the custom Data Type
  * @function
  * @example
  * const mutObserver = sjs.types.defineType('MutationObserver');
  *
  * // Somewhere in your code, you can check if the provided argument is
  * // of the intended type
  * function list(Array, Observer) {
  *   Array = sjs.types.arr(Array);
  *   Observer = mutObserver(Observer);
  *   // ...
  * }
  */
const defineType = (t) => typeOf(t);

/**
  * Provides the User s way to specify a list of allowed Data Types for a specific
  * argument.
  * @memberof types
  * @function
  * @param {String} - A list of allowed Data Types
  * @returns {Function} - A function which validates the allowed Data Types
  * @example
  * function checkDate(value) {
  *   const types = sjs.allowedTypes('String', 'Date');
  *   // value must be a String or a Date
  *   const date = new Date(types(value));
  *   return date;
  * }
  */
const allowedTypes = (...types) => typeOf(types);


/*
 * Given a data type, it returns a function that, when applied, checks if
 * the provide value is of the intended data type
 */
function typeOf(types) {
  return function(x) {
    const HTMLTest = /HTML.*Element/i;
    const INTEGERTest = /^[0-9]*$/g;
    const expected = [].concat(types).map(F.capitalize);
    const provided = F.capitalize(F.classOf(x));

    if (expected.includes('HTMLNODE') && HTMLTest.test(provided) ||
        expected.includes('INTEGER') && F.classOf(x) === 'Number' &&  INTEGERTest.test(x) ||
        expected.includes(provided)) {
      return x;
    } else {
      throw new TypeError(`
        Error: expected ${expected.join(' OR ')} but provided ${provided}
        `);
    }
  };
}

/**
 * Checks if all the items of an Array are of a particular DataType. If one of them
 * is not valid, the function throws a TypeError
 * @memberof types
 * @function arrayOf
 * @param {Function} fn -  A type validation function
 * @returns {Function} Takes an Array and validate each item's datatype
 * @param {Array} a - An Array of items
 * @returns {Array} The provided Array
 * @example
 * // Since all items are numbers, it returns [1, 2, 3]
 * sjs.types.arrayOf(sjs.types.num)([1, 2, 3]);
 *
 * // Since the last Array's item is the Null value,
 * // it throws TypeError - Error: expected NUMBER but provided NULL
 * sjs.types.arrayOf(sjs.types.num)([1, 2, 3, null]);
 * @example <caption>Defining a list of Allowed Data Types</caption>
 * const allowedTypes = sjs.types.allowedTypes('String', 'Integer');
 * // Since all items satisfy the requirement, it returns [1, 2, 3, 'Hello World']
 * sjs.types.arrayOf(allowedTypes)([1, 2, 3, 'Hello World']);
 *
 * // Since the second Array's item is a float number,
 * // it throws TypeError - Error: expected STRING or INTEGER but provided NUMBER
 * sjs.types.arrayOf(allowedTypes)([1, 2.2, 3, 'Hello World']);
 *
 * // Since the last Array's item is a nested Array,
 * // it throws TypeError - Error: expected STRING or INTEGER but provided ARRAY
 * sjs.types.arrayOf(allowedTypes)([1, 2, 3, 'Hello World', ['hi']]);
 *
 */
const {arrayOf} = F;


/**
 * This namespace provides a list of identity functions for common Data Types.
 * You may use the available utilities to validate the argument(s) of a function.
 * @namespace types
 * @example <caption>Argument validation - Integer Data Type</caption>
 * // The expected data type of a and b is an Integer
 * function add(a, b) {
 *    return sjs.types.int(a) + sjs.types.int(b);
 * }
 * @example <caption>Argument validation - Array Data Type</caption>
 * // The expected data type is of the a argument is an Array
 * function myFunc(a) {
 *    return sjs.F.types.arr(a).reduce((prev, curr) => prev + curr, 0);
 * }
 */
export const types = {
  str,
  num,
  int,
  bool,
  fun,
  date,
  obj,
  arr,
  sym,
  regex,
  HTMLNode,
  HTMLNodeList,
  HTMLFragment,
  defineType,
  allowedTypes,
  arrayOf
};