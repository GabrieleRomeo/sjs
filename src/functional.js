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
const str  = typeOf('string');
const num  = typeOf('number');
const int  = typeOf('integer');
const fun  = typeOf('function');
const bool = typeOf('boolean');

// Object data type
const date = typeOf('Date');
const obj = typeOf('Object');
const arr = typeOf('Array');
const sym = typeOf('Symbol');
const regex = typeOf('RegExp');
const HTMLNode = typeOf('HtmlNode');
const HTMLFragment = typeOf('DocumentFragment');

// Custom data type
// @memberof F
const allowedTypes = (...types) => typeOf(types);

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
// @memberof F
F.map = (fn, a) => arr(a).map(fun(fn));

// arrayOf :: (a -> b) -> ([a] -> [b])
// @memberof F
F.arrayOf = (fn) => (a) => F.map(fun(fn), arr(a));

// @memberof F
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
// @memberof F
F.toArray = (...a) => a;

// flip :: Function -> Function
// @memberof F
F.flip = (fn) => (...args) => fn.apply(this, args.reverse());

// rcompose :: Function -> Function
// @memberof F
F.rcompose = F.flip(F.compose);

// toLower :: String -> String
// @memberof F
F.toLower = (s) => s.toLowerCase();

// toUpper :: String -> String
// @memberof F
F.toUpper = (s) => s.toUpperCase();

// capitalize :: String -> String
// @memberof F
F.capitalize = (s) => {
  const a = F.toArray(s);
  return F.toUpper(a[0]) + a.slice(1).join('');
};

// @memberof F
F.unary = (fn) => {
  fn.length === 1
    ? fn
    : (arg) => fn(arg);
};

// @memberof F
F.once = (fn) => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

// getWith :: String -> String
// @memberof F
F.getWith = property => object => object[property];

// @memberof F
F.forEachObject = (obj, fn) => {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      // calls the fn function with key and value as its arguments
      fn(property, obj[property]);
    }
  }
};

// @memberof F
F.unless = (predicate, fn) => {
  if (!predicate) { fn(); }
};

// head :: Array -> Value
// @memberof F
F.head = (a) => arr(a)[0];

// tail :: Array :: Integer -> Array
// @memberof F
F.tail = (a, begin = 1) => arr(a).slice(int(begin), a.length);

// @memberof F
F.sortBy = (property) => {
  return (a, b) => {
    let r = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return r;
  };
};

// @memberof F
F.flatten = (array) => {
  let results = [];
  for (const value of array) {
    results.push.apply(results, value);
  }
  return results;
};

// @memberof F
F.zip = (leftArray, rightArray, fn) => {
  let result = [];
  let leftLength = leftArray.length;
  let rightLength = rightArray.length;

  for (let i = 0; i < Math.min(leftLength, rightLength); i++) {
    result.push(fn(leftArray[i], rightArray[i]));
  }
  return result;
};

// @memberof F
F.times = (times, fn) => {
  for ( let i=0; i < times; i++ ) {
    fn(i);
  }
};

// @memberof F
F.memoized = (fn) => {
  const lookupTable = {};
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

// not :: bool -> bool
// @memberof F
F.not = (x) => !bool(x);

// asyncAction :: Function -> Function
// @memberof F
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
 * Check if an object contains a key
 * @memberof F
 *
 * @param   {Object}  object    The Object under test
 * @param   {String}  x    The value under test
 * @return  {String| Undefined}
 */
F.contains = (object, x) => F.exists(obj(object)[x]);

export default { ...F };
