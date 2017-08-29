'use strict';

/**
 * The Functional Programming namespace.
 * This namespace contains a list of functions written in functional style
 * @namespace F
 */
const F = {};

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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * @memberof F.types
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
 * Checks if the provided Data Type is a DocumentFragment. Otherwise the System
 * throws a TypeError
 * @memberof F.types
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
  * @memberof F.types
  * @function
  */
const defineType = (t) => typeOf(t);

/**
  * @memberof F
  * @function
  */
const allowedTypes = (...types) => typeOf(types);

/**
 * This namespace provides a list of identity functions for common Data Types.
 * You may use the available utilities to validate the argument(s) of a function.
 * @namespace F.types
 * @example <caption>Argument validation - Integer Data Type</caption>
 * // The expected data type of a and b is an Integer
 * function add(a, b) {
 *    return sjs.F.types.int(a) + sjs.F.types.int(b);
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
  HTMLFragment,
  defineType,
  allowedTypes,
};


/******************************************************************************
 *                        Functional Library Unit
 * [Category Theory]
 *
 *  Categories ---> Sets composed from elements of the same types
 *  Morphisms  ---> Pure functions that, given a set of specific inputs,
 *                  they always return the same output
 *
 *  Functions:   1) Homomorphic - if limited to a single category
 *               2) Polymorphic - if can operate on multiple categories
 ******************************************************************************/


/**
 * Takes a Function with {N} parameters and splits it in a series of
 * functions each taking a single argument. It allows you to provide an
 * optional parameter 'n' which sets the function's arity.
 * @memberof F
 * @param {Function} fn A function to be curried
 * @param {Integer}   n An optional integer representing the arity of the
 *                      fn function
 *
 * @returns {Function} It returns a series of functions each taking a
 *                     single argument.
 *
 */
F.curry = function(fn, n) {
  const arity = n || fn.length;

  return function curried(...args) {
    const context = this;

    return  args.length >= arity    ?
            fn.apply(context, args) :
            function() {
              let remain = F.toArray(arguments);
              return curried.apply(this, args.concat(remain));
            };
  };
};

/**
 * Takes a Function with {N} parameters and splits it in a series of
 * functions each taking a single argument. It allows you to provide an
 * optional parameter 'n' which sets the function's arity. Unlike curry,
 * rcurry curries a function's arguments from right to left.
 * @memberof F
 * @param {Function} fn A function to be curried
 * @param {Integer}   n An optional integer representing the arity of the
 *                      fn function
 *
 * @returns {Function} It returns a series of functions each taking a
 *                     single argument.
 *
 */
F.rcurry = (fn, n) => F.curry(F.flip(fn), n);

///////////////////////// FUNCTORS /////////////////////////

// map :: (a -> b) -> [a] -> [b]
/**
  * @memberof F
  * @function
  */
F.map = (fn, a) => arr(a).map(fun(fn));

// arrayOf :: (a -> b) -> ([a] -> [b])
/**
  * @memberof F
  * @function
  */
F.arrayOf = (fn) => (a) => F.map(fun(fn), arr(a));

/**
  * @memberof F
  * @function
  */
F.compose = (...args) => {
  // Checks that all the arguments are functions
  let funcs = F.arrayOf(fun)(args);

  // returns a function that applies all the provided functions
  return function(...argsOfFuncs) {
    let i = funcs.length - 1;
    let fn;

    do {
      fn = F.curry.call(this, funcs[i]);
      argsOfFuncs = [fn.apply(this, argsOfFuncs)];
      i--;
    } while(i >= 0);

    return argsOfFuncs[0];
  };
};

// toArray :: a -> [a]
/**
  * @memberof F
  * @function
  */
F.toArray = (...a) => a;

// flip :: Function -> Function
/**
  * @memberof F
  * @function
  */
F.flip = (fn) => (...args) => fn.apply(this, args.reverse());

// rcompose :: Function -> Function
/**
  * @memberof F
  * @function
  */
F.rcompose = F.flip(F.compose);

// toLower :: String -> String
/**
  * @memberof F
  * @function
  */
F.toLower = (s) => s.toLowerCase();

// toUpper :: String -> String
/**
  * @memberof F
  * @function
  */
F.toUpper = (s) => s.toUpperCase();

// capitalize :: String -> String
/**
  * @memberof F
  * @function
  */
F.capitalize = (s) => {
  const a = F.toArray(s);
  return F.toUpper(a[0]) + a.slice(1).join('');
};

/**
  * @memberof F
  * @function
  */
F.unary = (fn) => {
  fn.length === 1
    ? fn
    : (arg) => fn(arg);
};

/**
  * @memberof F
  * @function
  */
F.once = (fn) => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

// getWith :: String -> String
/**
  * @memberof F
  * @function
  */
F.getWith = property => object => object[property];

/**
  * @memberof F
  * @function
  */
F.forEachObject = (obj, fn) => {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      // calls the fn function with key and value as its arguments
      fn(property, obj[property]);
    }
  }
};

/**
  * @memberof F
  * @function
  */
F.unless = (predicate, fn) => {
  if (!predicate) { fn(); }
};

// head :: Array -> Value
/**
  * @memberof F
  * @function
  */
F.head = (a) => arr(a)[0];

// tail :: Array :: Integer -> Array
/**
  * @memberof F
  * @function
  */
F.tail = (a, begin = 1) => arr(a).slice(int(begin), a.length);

/**
  * @memberof F
  * @function
  */
F.sortBy = (property) => {
  return (a, b) => {
    let r = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return r;
  };
};

/**
  * @memberof F
  * @function
  */
F.flatten = (array) => {
  let results = [];
  for (const value of array) {
    results.push.apply(results, value);
  }
  return results;
};

/**
  * @memberof F
  * @function
  */
F.zip = (leftArray, rightArray, fn) => {
  let result = [];
  let leftLength = leftArray.length;
  let rightLength = rightArray.length;

  for (let i = 0; i < Math.min(leftLength, rightLength); i++) {
    result.push(fn(leftArray[i], rightArray[i]));
  }
  return result;
};

/**
  * @memberof F
  * @function
  */
F.times = (times, fn) => {
  for ( let i=0; i < times; i++ ) {
    fn(i);
  }
};

/**
  * @memberof F
  * @function
  */
F.memoized = (fn) => {
  const lookupTable = {};
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

// not :: bool -> bool
/**
  * @memberof F
  * @function
  */
F.not = (x) => !bool(x);

/**
  * asyncAction :: Function -> Function
  * @memberof F
  * @function
  */
F.asyncAction = action =>  {
  action = fun(action);
  return function(context, ...args) {
    return window.requestAnimationFrame(() => action.apply(context, args));
  };
};

/*
 * Given a data type, it returns a function that, when applied, checks if
 * the provide value is of the intended data type
 * @memberof F
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
 * It calls the 'fn' function if and only if the provided parameters
 * are neither null nor undefined
 * @memberof F
 *
 * @param {Object} fn The function that could be applied
 *
 * @returns {(value | undefined)} The fn's evalutation or undefined
 */

F.maybe = (fn)  => {
  return function() {

    var i,
      len = arguments.length;

    if (len === 0) {
      return void 0;
    } else {

      for (i = 0; i < len; i++) {
        if (!arguments[i]) return void 0;
      }
      // If all the parameters were provided to the original function,
      // applies it
      return fn.apply(this, arguments);
    }
  };
};

/**
 * Provides the actual dataType of the provided argument
 * @memberof F
 *
 * @param      {value}  value  The value under test
 * @return     {string}  The datatype's name
 * @example
 * // returns "Number"
 * sjs.F.classOf(5);
 * @example
 * // returns "Object"
 * sjs.F.classOf({});
 */
F.classOf = (value) => {
  if ( value === null ) { return 'Null'; }
  if ( value === undefined ) { return 'Undefined'; }
  return Object.prototype.toString.call(value).slice(8, -1);
};

/**
 * Check if the provided value is neither Null nor Undefined
 * @memberof F
 *
 * @param   {value}  x    The value under test
 * @return  {boolean}
 */
F.exists = x => F.classOf(x) !== 'Null' && F.classOf(x) !== 'Undefined';

/**
 * Check if the provided value is neither Null nor Undefined
 * @memberof F
 *
 * @param   {value}  x    The value under test
 * @return  {boolean}
 */
F.notExists = x => !F.exists(x);

/**
 * Check if an object contains a specific key
 * @memberof F
 *
 * @param   {Object}  object    The Object under test
 * @param   {String}  x    The value under test
 * @return  {String| Undefined}
 * @example
 * let obj = {
 *  color: 'red'
 * };
 *
 * // returns true
 * sjs.F.contains(obj, 'color');
 */
F.contains = (object, x) => F.exists(obj(object)[x]);

export default { ...F };
