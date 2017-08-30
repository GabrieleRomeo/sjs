'use strict';

import { types as TYPES } from './types';
import ULYF from './functional';

/**
 * The Utilities namespace.
 * This namespace contains a set of utility functions used for a variety of things.
 * For example the evaluation of arguments or the generation of random integer
 * or Guid
 * @namespace U
 */
const U = {};

const math = Math;
const mathFloor = math.floor;
const mathRnd = math.random;

/**
 * Iterates and calls the callback parameter for each element or property
 * of a list at the interval specified by the n parameter.
 * It does not call callback on values greater than the list’s number
 * @memberof U
 * @param {Array} list The list of values
 * @param {int} n An interval used as step of the iteration
 * @param {Func} n A callback function applied on the elements within the
 *                 step
 *
 * @returns {void}
 * @example
 * let result = [];
 * const double = (x) => result.push(x * 2);
 * sjs.U.by([1, 2, 3, 4, 5, 6], 2, double);
 * // result now contains [4, 8, 12]
 */
U.by = (list, n, callback) => {
  list = TYPES.arr(list);
  callback = TYPES.fun(callback);

  if (ULYF.notExists(n)) {
    n = 1;
  }

  n = TYPES.int(n);

  let len = list.length;
  let i;

  for (i = 0; i < len; i++) {
    if (n <= len && ((i + 1) % n === 0)) {
      callback(list[i], i, list);
    }
  }
};

const _objExtract = (object, value) => {
  object = TYPES.obj(object);
  const list = Object.keys(object);
  return list.map((v) => value === 'value' ? object[v] : v);
};

/**
 * Creates an array of all the keys of an object
 * @memberof U
 * @param {Object} object The object used as a template
 * @returns {Array} An Array containing all the keys of the provided object
 */
U.keys = object => _objExtract(object, 'key');

/**
 * Creates an array containing all the values of the provided object
 * @memberof U
 * @param {Object} object The object used as a template
 * @returns {Array} An Array containing all the values of the provided
 *                  object
 * @example
 * const obj = {
 *    key1: 'Value one!',
 *    key2: 'Value two!!!'
 * };
 * // returns ['Value one!', 'Value two!!!']
 * sjs.U.values(obj);
 */
U.values = object => _objExtract(object, 'value');

/**
 * Creates an array of all keys and values of an object in the order of
 * [key, value, key, value] for as many key/value pairs as exist in the
 * object.
 * @memberof U
 * @param {Object} object The object used as a template
 * @returns {Array} An Array containing all keys and values pairs of the provided
 *                  object
 * @example
 * // returns ["count", 5, "length", 10, "total", 16]
 * pairs({count: 5, length: 10, total: 16});
 */
U.pairs = function(object) {
  const list = Object.keys(TYPES.obj(object));
  return ULYF.flatten(list.map(v => [v, object[v]]));
};

/**
 * Returns a randomly re-arranged copy of the elements in its parameter
 * array.
 * @memberof U
 * @param {Array} object The Array used as a template
 * @returns {Array} A randomly re-arranged copy of the original Array
 *  @example
 *  let arr = [1,2,3,4,5];
 *  // returns a new array containing shuffled elements like: [2,4,5,3,1]
 *  sjs.U.shuffle(arr);
 */
U.shuffle = function(array) {
  let result = Array.from(TYPES.arr(array));
  for (let i = result.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [result[i - 1], result[j]] = [result[j], result[i - 1]];
  }
  return result;
};

/**
 * Returns the plural of a word depending on the value of the n parameter.
 * If n is 1, return the non-plural word (parameter word);
 * otherwise, add an “s” to the plural word.
 * If the pluralWord parameter is provided, instead of adding an “s,”
 * return the pluralWord.
 * @memberof U
 * @param {int} n The number of "s"
 * @param {String} word A non-plural word
 * @param {String} pluralWord An optional plural word
 *
 * @returns {String} A pluralized string
 *
 * @example
 * // returns "lion"
 * sjs.U.pluralize(1, "lion");
 * @example
 * // returns "lions"
 * sjs.U.pluralize(2, "lion");
 * @example
 * // returns "lions"
 * sjs.U.pluralize(5, "lion");
 * @example
 * // returns "lions"
 * sjs.U.pluralize(0, "lion");
 * @example
 * // returns "lioness"
 * sjs.U.pluralize(1, "lioness");
 * @example
 * // returns "lionesss"
 * sjs.U.pluralize(2, "lioness");
 * @example
 * // "lionesses"
 * sjs.U.pluralize(2, "lioness", "lionesses);
 */
U.pluralize = function(n, word, pluralWord) {
  n = TYPES.int(n);
  word = TYPES.str(word);

  if (pluralWord) { return pluralWord; }
  if (n === 1) { return word; }

  return word + 's';
};


/**
 * Converts a camelCase string to a dashed string.
 * Camel case presents words with no spaces separating them and with
 * each word’s first letter capitalized except the first word,
 * which is lower case.
 * @memberof U
 * @param {string} str A camelCase string
 * @returns {String} A dashed string
 *
 * @example
 * // returs hot-dog
 * toDash(hotDog);
 * @example
 * // returs space-station-complex
 * toDash(spaceStationComplex);
 * @example
 * // returns my-first-function
 * toDash(myFirstFunction);
 *
 */
U.toDash = function(str) {
  let chars = TYPES.str(str).split('');

  return chars.map(function(item) {
    if (item === item.toUpperCase()) {
      return '-' + item.toLowerCase();
    }
    return item;
  }).join('');
};

/**
 * Converts a dashed string to a camel case string.
 * @memberof U
 * @param {string} str A dashed string
 * @returns {String} A camelCase string
 *
 * @example
 * // returns hot-dog
 * toCamel(hot-dog);
 * @example
 * // returns spaceStationComplex
 *  toCamel(space-station-complex);
 */
U.toCamel = function(str) {
  let chars = TYPES.str(str).split('-');
  const head = ULYF.head(chars).toLowerCase();

  let remaining = ULYF.tail(chars).map(function(item) {
    return item.charAt(0).toUpperCase() + item.substr(1);
  }).join('');

  return head + remaining;
};

/**
 * Searches through all the [values] of the provided object and returns “true”
 * if any of them matches the query string. Otherwise it returns “false”.
 * @memberof U
 * @param {Object} obj An object
 * @param {String} search The string you are looking for
 *
 * @returns {boolean} {(True|False)} True if any of the values match the query
 *                                    string. False otherwise.
 */
U.has = (object, search) => {
  for (const prop in TYPES.obj(object)) {
    if (object.hasOwnProperty(prop) && object[prop] === search) {
      return true;
    }
  }

  return false;
};

/**
  * Returns a new object by picking all key/value pairs from the argument
  * obj.
  * The keys that are picked will be determined by the array parameter keys.
  * @memberof U
  * @param {Object} obj An object
  * @param {Array} keys A list of keys
  *
  * @returns {Object} An object which is composed by the requested keys
  *
  * @example
  *  var data = {
  *     type: "transformer",
  *     index: 19,
  *     siblings: 19,
  *     access: "full"
  * };
  *
  * // returns {type: "transformer", index: 19};
  * sjs.U.pick(data, ["type", "index"]);
  *
  * // returns {siblings: 19, index: 19};
  * sjs.U.pick(data, ["siblings", "index"]);
  *
  * // returns {access: "full"};
  * sjs.U.pick(data, ["access", "animals"]);
  */
U.pick = (obj, keys) => {
  obj  = TYPES.obj(obj);
  keys = TYPES.arr(keys);

  return keys.reduce(function(result, key) {
    if (ULYF.exists(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});

};

/**
 * Replaces all occurencies of a particular search string with another
 * string
 * @memberof U
 * @example
 * // returns Hell? W?rld!
 * sjs.U.replaceAll('Hello World!', 'o', '?');
 * @param {String} text A string used as a base for the search
 * @param {String} search A string you are looking for the replace
 * @param {String} replace A string used as replacing
 *
 * @returns {String} A new string with all occurrencies replaced
 *
 */
U.replaceAll = (text, search, replace) => TYPES.str(text)
                                               .split(TYPES.str(search))
                                               .join(TYPES.str(replace));

/**
 * Get a random integer
 * @memberof U
 * @param  {Number} [max]  The upper limit (defualt 10 - not included)
 * @param  {Number} [min]  The lower limit (default 0 - included)
 * @return {Number}      A random integer from min to max
 */
U.getRandomInt = (max = 10, min = 0) => {
  return mathFloor(mathRnd() * (TYPES.int(max) - TYPES.int(min))) + min;
};

/**
 * Get a random integer (inclusive)
 * @memberof U
 * @param  {Number} [max]  The upper limit (defualt 10 - included)
 * @param  {Number} [min]  The lower limit (default 0 - included)
 * @return {Number}      A random integer from min to max
 */
U.getIncRandomInt = (max = 10, min = 0) => {
  return mathFloor(mathRnd() * (TYPES.int(max) - TYPES.int(min) + 1)) + min;
};

/**
 * Retrieve the value of a particular cookie through its name
 * @memberof U
 * @param  {string}   name The cookie's name
 * @return {(string | undefined)}  Returns the value of the intended cookie
 *                                or undefined
 */
U.getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');

  let cookiesMap = cookies.reduce((map, curr) => {
    const parts = curr.split('=');
    return map.set(parts[0].trim(), parts[1]);
  }, new Map());

  return cookiesMap.get(TYPES.str(name));
};

/*
 * Get an object containing all the existing cookies or a single cookie (if any)
 * @memberof U
 * @param  {string}   [name] The cookie's name
 * @return {Object}    Return an object containing all cookies, the intended
 *                      cookie (if the name argument has been provided), or
 *                      an empty object
 */
U.getCookies = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');

  let cookieObj = cookies.reduce((prev, curr) => {
    const parts = curr.split('=');

    if (name) {
      if (parts[0].trim() === TYPES.str(name)) {
        prev[parts[0].trim()] = parts[1];
      }
    } else {
      prev[parts[0].trim()] = parts[1];
    }
    return prev;
  }, {});

  if (Object.keys(cookieObj).length === 0) {
    return null;
  }

  return cookieObj;
};


const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

/**
 * Generate a random GUID
 * @memberof U
 * @example
 * // returns a string like "171d531b-54b1-cd9b-11b0-7951130e68d4"
 * sjs.U.generateGUID();
 * @return {String}
 */
U.generateGUID = () => `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;

/**
 * Given a day number it returns the day name or "Unknown".
 * (0 - Sunday || 6 - Saturday)
 *
 * @memberof U
 * @example
 * // returns "Sunday"
 * sjs.U.getDayName(0);
 *
 * // returns "Wednesday"
 * sjs.U.getDayName(3);
 *
 * // returns "Unknown"
 * sjs.U.getDayName(7);
 *
 * @param      {Number}  dayNumber  The day number
 * @return     {string}  The day name.
 */
U.getDayName = (dayNumber) => {
  let dayName;
  switch (TYPES.int(dayNumber)) {
  case 0:
    dayName = 'Sunday';
    break;
  case 1:
    dayName = 'Monday';
    break;
  case 2:
    dayName = 'Tuesday';
    break;
  case 3:
    dayName = 'Wednesday';
    break;
  case 4:
    dayName = 'Thursday';
    break;
  case 5:
    dayName = 'Friday';
    break;
  case 6:
    dayName = 'Saturday';
    break;
  default:
    dayName = 'Unknown';
  }
  return dayName;
};

/**
 * Given two dates it returns the difference between them in days
 * @memberof U
 * @param  {d1} Date The first date
 * @param  {d2} Date The second date
 *
 * @returns {int} The difference in days
 * @example
 * // returns 9
 * sjs.U.getDiffInDays(new Date('2017-05-10'), new Date('2017-05-01'));
 */
U.getDiffInDays = (d1, d2) => {

  let diffInMilliSec = d1.getTime() - d2.getTime();
  const milliSecInAday = 24 * 60 * 60 * 1000; //total milli-seconds in a day

  return Math.floor(diffInMilliSec / milliSecInAday);
};

// export public functions
export default { ...U };

