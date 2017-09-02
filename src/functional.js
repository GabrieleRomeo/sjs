'use strict';

import { types as TYPES } from './types';

/**
 * The Functional Programming namespace.
 * This namespace contains a list of functions written in functional style
 * @namespace F
 */
const F = {};

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
 * @signature curry :: (Function, Integer) -> Function* -> a
 * @param {Function} fn A function to be curried
 * @param {Integer}   n An optional integer representing the arity of the
 *                      fn function
 *
 * @returns {Function} It returns a series of functions each taking a
 *                     single argument.
 * @example <caption>Provides the arguments to myFunction in 3 different steps</caption>
 * const myFunction = (a, b, c) => 'a = ' + a + '; b = ' + b + '; c = ' + c;
 *
 * // Make myFunction a curried function
 * const curriedFunction = sjs.F.curry(myFunction);
 *
 * var result = '';
 *
 * // Provide the first argument to the curried function
 * result = curriedFunction('Hello');
 *
 * // Provide the second argument to the curried function
 * result = result('World');
 *
 * // Provide the last argument to the curried function
 * result = result('!!!');
 *
 * // returns "a = Hello; b = World; c = !!!"
 *
 * @example <caption>Provides the arguments in two steps</caption>
 *
 * var result = curriedFunction('Have', 'a');
 * // returns "a = Have; b = a; c = good day!"
 * result('good day!');
 *
 * @example <caption>Provides all the arguments in a single step</caption>
 *
 * // returns "a = Wow; b = It's; c = wonderful!"
 * curriedFunction('Wow')('It\'s')('wonderful!');
 *
 * @example <caption>Specifies the Function's arity</caption>
 * // The following function is Variadic because it takes a variable number of
 * // arguments and returns the sum of them
 * const sum = (...args) => args.reduce((a, b) => a + b, 0);
 * // returns 49
 * sum(3, 4, 5, 6, 10, 21);
 *
 *
 * // The curried function will be applied when we provide at least 2 arguments
 * // to it.
 * const curriedSum = sjs.F.curry(sum);
 * const curriedSumArity = sjs.F.curry(sum, 2);
 *
 * // returns TypeError
 * curriedSum(3)(4);
 *
 * // returns 7
 * curriedSumArity(3)(4);
 */
F.curry = function(fn, n) {
  const arity = n || fn.length;

  return function curried(...args) {
    const context = this;

    return  args.length >= arity    ?
            fn.apply(context, args) :
            function(...remain) {
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
 * @signature rcurry :: (Function, Integer) -> Function* -> a
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

/**
  * Take a Function and an Array an applies the Function to each Array's item.
  * @memberof F
  * @signature map :: (a -> b) -> [a] -> [b]
  * @param {Function} fn The function to be applied
  * @param {Array} a An array of items
  * @returns {Array} An array containing the mapped items
  * @example
  * const multiplyBy2 = n => n * 2;
  * // returns [2, 4, 8, 12]
  * sjs.F.map(multiplyBy2, [1, 2, 4, 6]);
  */
F.map = (fn, a) => TYPES.arr(a).map(TYPES.fun(fn));

/**
  * Checks if all the items of an Array are of a particular DataType. If one of them
  * is not valid, the function throws a TypeError
  * @memberof F
  * @signature arrayOf :: (a -> b) -> ([a] -> [b])
  * @param {Function} fn -  A type validation function
  * @returns {Function} Takes an Array and validate each item's datatype
  * @param {Array} a - An Array of items
  * @returns {Array} The provided Array
  * @example
  * // Since all items are numbers, it returns [1, 2, 3]
  * sjs.F.arrayOf(sjs.types.num)([1, 2, 3]);
  *
  * // Since the last Array's item is the Null value,
  * // it throws TypeError - Error: expected NUMBER but provided NULL
  * sjs.F.arrayOf(sjs.types.num)([1, 2, 3, null]);
  * @example <caption>Defining a list of Allowed Data Types</caption>
  * const allowedTypes = sjs.types.allowedTypes('String', 'Integer');
  * // Since all items satisfy the requirement, it returns [1, 2, 3, 'Hello World']
  * sjs.F.arrayOf(allowedTypes)([1, 2, 3, 'Hello World']);
  *
  * // Since the second Array's item is a float number,
  * // it throws TypeError - Error: expected STRING or INTEGER but provided NUMBER
  * sjs.F.arrayOf(allowedTypes)([1, 2.2, 3, 'Hello World']);
  *
  * // Since the last Array's item is a nested Array,
  * // it throws TypeError - Error: expected STRING or INTEGER but provided ARRAY
  * sjs.F.arrayOf(allowedTypes)([1, 2, 3, 'Hello World', ['hi']]);
  *
  */
F.arrayOf = (fn) => (a) => F.map(TYPES.fun(fn), TYPES.arr(a));

/**
  * It allows to build complex functions from many simple functions.
  * Through composition, a function can be viewed as a building block for other
  * functions.
  * @memberof F
  * @function
  * @signature Function* -> a
  * @example
  * const add = (a, b) => a + b;
  * const mul = (a, b) => a * b;
  *
  * const addAndMul = sjs.F.compose(add, mul);
  * // returns 7 because mul is applied first, then 1 is added to the result
  * // 2 * 3 = 6
  * // 6 + 1
  * addAndMul(2, 3)(1);
  *
  * // returns 5
  * addAndMul(2, 3)(1);
  */
F.compose = (...args) => {
  // Checks that all the arguments are functions
  let funcs = F.arrayOf(TYPES.fun)(args);

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

/**
  * @memberof F
  * @function
  * @signature toArray :: a -> [a]
  */
F.toArray = (...a) => a;

/**
  * Take a function and returns another function which takes a list of arguments
  * and applies the first function to the arguments swapped in reverse order.
  * @memberof F
  * @function
  * @signature flip :: Function -> a* -> f a
  * @example
  * const sub = (a, b) => a - b;
  * // returns 2 (5 - 3)
  * sub(5, 3);
  *
  * const flippedSub = sjs.F.flip(sub);
  * // returns -2 (3 - 5)
  * flippedSub(5, 3);
  */
F.flip = (fn) => (...args) => fn.apply(this, args.reverse());

/**
  * As compose, It allows to build complex functions from many simple functions.
  * Unlike compose, rcompose applies each composing functions from left to right.
  * @memberof F
  * @function
  * @signature Function* -> a
  * @signature rcompose :: Function -> Function
  * @example
  * const add = (a, b) => a + b;
  * const mul = (a, b) => a * b;
  *
  * // Standard compose
  * const addAndMul = sjs.F.compose(mul, add);
  * // returns 5 because the add function is applied first then
  * // the mul function. ((2 + 3) * 1)
  * addAndMul(2, 3)(1);
  *
  * // Right compose
  * const revMul = sjs.F.rcompose(mul, add);
  * // returns 5 because the mul function is applied first then
  * // the add function. ((2 * 3) + 1)
  * revMul(2, 3)(1);
  */
F.rcompose = F.flip(F.compose);

/**
  * Tranform a String into Lowercase
  * @memberof F
  * @signature toLower :: String -> String
  * @param {String} s The text to be transformed
  * @return {String} The text in Lowercase
  */
F.toLower = (s) => s.toLowerCase();

/**
  * Tranform a String into Uppercase
  * @memberof F
  * @signature toUpper :: String -> String
  * @param {String} s The text to be transformed
  * @return {String} The text in Uppercase
  */
F.toUpper = (s) => s.toUpperCase();

/**
  * Take a String and capitalize its first word.
  * @memberof F
  * @signature capitalize :: String -> String
  * @param {String} s The text to be transformed
  * @return {String} The capitalized text
  */
F.capitalize = (s) => {
  const a = F.toArray(s);
  return F.toUpper(a[0]) + a.slice(1).join('');
};

/**
  * Convert a function which takes n arguments into a function which takes
  * just one argument
  * @memberof F
  * @function
  * @signature unary :: Function -> Function
  * @param {Function} fn A function taking n arguments
  * @returns {Function} A function which takes just one argument
  * @example
  * // returns [2, NaN];
  * ['2', '4'].map(parseInt);
  *
  * // returns [2, 4];
  * ['2', '4'].map(sjs.F.unary(parseInt));
  */
F.unary = (fn) => fn.length === 1 ? fn : (arg) => fn(arg);

/**
  * Executes a function just once
  * @memberof F
  * @function
  * @signature once :: Function -> a
  * @example
  * // sjs.U.generateGUID generates a unique GUID
  * const uniqueID = sjs.F.once(sjs.U.generateGUID);
  * // returns a string like "63651124-d561-1897-36c8-53058d87519c"
  * uniqueID();
  *
  * // return undefined
  * uniqueID();
  *
  * // return undefined
  * uniqueID();
  */
F.once = (fn) => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

/**
  * @memberof F
  * @function
  * @signature getWith :: String -> Object -> a
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
  * Take a predicate and a Function and Apply the function only when the predicate
  * is false
  * @memberof F
  * @function
  * @signature (bool, Function) -> a
  * @param {Bool} predicate The predicate
  * @param {Function} fn A function to be applied when the predicate is false
  * @returns {Any} The result of the applied function
  * @example
  * const list = [
  *   { disabled: false, name: 'Action 1' },
  *   { disabled: true, name: 'Action 2' },
  *   { disabled: false, name: 'Action 3' },
  * ];
  *
  * // returns
  * // {disabled: false, name: "Action 1"} "is disabled"
  * // {disabled: false, name: "Action 3"} "is disabled"
  * list.forEach(item => {
  *   sjs.F.unless(item.disabled, () => console.log(item, 'is disabled'));
  * });
  */
F.unless = (predicate, fn) => {
  if (!predicate) { fn(); }
};

/**
  * Returns the first item of an Array
  * @memberof F
  * @signature head :: Array -> a
  * @param {Array} a An Array
  * @returns {Any} The first item
  */
F.head = (a) => TYPES.arr(a)[0];

/**
  * Returns an Array containing all the items starting from the second item
  * (default).
  * @memberof F
  * @signature tail :: (Array, Integer) -> Array
  * @param {Array} a An Array
  * @param {Integer} [begin = 1] The first item of the resulting array
  * @returns {Array} An array containing a portion of the original array
  */
F.tail = (a, begin = 1) => TYPES.arr(a).slice(TYPES.int(begin), a.length);

/**
  * Given a property's name and a two object, it returns:<br>
  * -1 if the property's length of the object 1 is lesser than that of object 2<br>
  * 1  if both the lengths are equal<br>
  * 0 if the property's length of the object 1 is grather than that of object 2<br>
  * @memberof F
  * @signature String -> (a, b) -> Integer
  * @param {String} property The property's name
  * @returns {Function} A function which takes two object
  * @param {Object} a The first object
  * @param {Object} b The second object
  * @returns {Integer} -1, 1, 0
  * @example
  * const cars = [
  *   { name: 'Ferrari', color: 'red' },
  *   { name: 'Lamborghini', color: 'black' },
  *   { name: 'Porsche', color: 'green' }
  * ];
  *
  * // returns [
  * //  { name: 'Lamborghini', color: 'black' },
  * //  { name: 'Porsche', color: 'green' },
  * //  { name: 'Ferrari', color: 'red' }
  * // ];
  * cars.sort(sjs.F.sortBy('color'));
  *
  * // returns [
  * //  { name: 'Ferrari', color: 'red' }
  * //  { name: 'Lamborghini', color: 'black' },
  * //  { name: 'Porsche', color: 'green' },
  * // ];
  * cars.sort(sjs.F.sortBy('name'));
  */
F.sortBy = (property) => {
  return (a, b) => {
    let r = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return r;
  };
};

/**
  * Concatenate nested arrays (1 level depth) into a single array
  * @memberof F
  * @signature flatten :: Array -> Array
  * @param {Array} a An array containing nested arrays
  * @returns {Array} An flatten array
  * @example
  * // returns [1, 2, 3]
  * sjs.F.flatten([[1], 2, 3]);
  */
F.flatten = (array) => array.reduce((p, n) => p.concat(n), []);

/**
  * Merge two arrays and apply a callback function
  * @memberof F
  * @signature zip :: (Array, Array, Function) -> Array
  * @param {Array} leftArray The left array
  * @param {Array} rightArray The right array
  * @param {Function} fn A callback function
  * @returns {Array} A merged array
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
  * Apply a function n times.
  * @memberof F
  * @function
  * @signature times :: (Integer, (Integer -> b)) -> b
  * @example
  * sjs.F.times(10, n => {
  *   console.log(n % 2);
  * });
  */
F.times = (times, fn) => {
  for ( let i=0; i < times; i++ ) {
    fn(i);
  }
};

/**
  * Allow a Function to remember or memorize its result.
  * @memberof F
  * @function
  * @signature memoized :: Function -> (a) -> a
  * @param {Function} fn The Function you wish to work with
  * @returns {Function} A Function
  * @param {Any} arg An argument to memorize
  * @returns {Any} The result of applying the argument to the fn Function
  */
F.memoized = (fn) => {
  const lookupTable = {};
  return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};


/**
  * Negate a predicate
  * @memberof F
  * @function
  * @signature not :: bool -> bool
  * @param {Bool} x A predicate
  * @returns {Bool} The negation of x
  */
F.not = (x) => !TYPES.bool(x);

/**
  * asyncAction :: Function -> Function
  * @memberof F
  * @function
  */
F.asyncAction = action =>  {
  action = TYPES.fun(action);
  return function(context, ...args) {
    return window.requestAnimationFrame(() => action.apply(context, args));
  };
};

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
 * @signature classOf :: a -> String
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
 * Checks if the provided value is neither Null nor Undefined.
 * @memberof F
 * @signature exists :: a -> bool
 *
 * @param   {Any}  x    The value under test
 * @return  {boolean}
 */
F.exists = x => F.classOf(x) !== 'Null' && F.classOf(x) !== 'Undefined';

/**
 * Check if the provided value is either Null or Undefined.
 * @memberof F
 * @signature notExists :: a -> bool
 *
 * @param   {Any}  x    The value under test
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
F.contains = (object, x) => F.exists(TYPES.obj(object)[x]);

export default { ...F };
