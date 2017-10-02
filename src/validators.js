'use strict';

import { types as TYPES } from './types';
import ULYF from './functional';
import ULYU from './utilities';

/**
 * The Validators namespace.
 * This namespace contains a set of Utility Functions useful to validate inputs,
 * check data type, check Dates, etc..
 * @namespace V
 */
const V = {};

const _ALPHA  = 'abcdefghijklmnopqrstuvwxyz0123456789';



/**
 * Checks if the provided argument is an Array
 * @memberof V
 * @param {Array} arr An Array
 *
 * @returns {Boolean} True | False
 *
 */
V.isArray = Array.isArray || (arr => ULYF.classOf(arr) === 'Array');

/**
 * Checks if the provided argument is a Function
 * @memberof V
 * @param {Fun} fn A Function
 *
 * @returns {Boolean} True | False
 *
 */
V.isFunc = fn => typeof fn === 'function';

/**
 * Checks if the provided argument is a String
 * @memberof V
 * @param {str} str A String
 *
 * @returns {Boolean} True | False
 *
 */
V.isString = str => typeof str === 'string';

/**
 * Checks if the provided argument is a Number
 * @memberof V
 * @param {Number} num A Number
 *
 * @returns {Boolean} True | False
 *
 */
V.isNumber = num => !isNaN(parseFloat(num)) && isFinite(num);

/**
 * Checks if the provided argument is an Integer
 * @memberof V
 * @param {Number} num A Number
 * @returns {Boolean} True | False
 *
 */
V.isInt = num => V.isNumber(num) && (parseFloat(num) === parseInt(num, 10));

/**
 * Checks if the provided input is a valid email address
 *
 * It checks for the presence of duplicated dots inside the local and domain
 * parts.
 * This function does not use Regular Expressions
 * @memberof V
 * @param  {string} input The string representing a valid email address.
 *
 * @returns {boolean} True or False
 */
V.isEmailAddress = (input) => {
  const parts = TYPES.str(input).split('@');

  const minLength = parts.length === 2 || false;
  const local     = parts[0] && (parts[0].length > 0) &&
                    !V.isConsecutive(parts[0], '.')  || false;
  const domain    = parts[1] && !V.isConsecutive(parts[1], '.') || false;

  return minLength && local && domain;
};

/**
 * Checks if the provided input is a valid ITALIAN phone number
 *
 * LANDLINE NUMBERS and MOBILE PHONES
 *
 * Phone numbers in Italy have variable length. There's no well established
 * convention about how to group digits or which symbol to use, but this is
 * hardly an issue since all the digits are always dialed.
 *
 * This evaluation shall take into account also of the country code (+39),
 * international prefix (00) and emergency or service numbers
 *
 * Valid numbers:
 *      Landline : 02-19838788, +3902-19838788, 003902-19838788
 *      Mobile   : 333-1111111, +39333-1111111, 0039333-1111111
 *
 * This function does not use Regular Expressions
 * @memberof V
 * @param  {string} input The string representing a valid phone number.
 *
 * @returns {boolean} True or False
 */
V.isPhoneNumber = function(input) {

  const COUNTRY_CODE        = '39',
        INTERNATIONAL_PRFX  = '00',
        SPECIALS = [
          '112', '113', '115', '116', '117', '118', '1515', '1518', '1530'
        ],
        ZONES = {
          1: {
            prefixes: ['010','011','0122','0123','0124','0125','0131',
                       '0141','015','0161','0163','0165','0166','0171',
                       '0183','0184','0185','0187']
          },
          2: {
            prefixes: ['02']
          },
          3: {
            prefixes: ['030','031','0321','0322','0324','0331','0332',
                       '0341','0342','0343','0344','0346','035','0362',
                       '0362','0363','0364','0365','0371','0372','0373',
                       '0375','0376','0382','039']
          },
          4: {
            prefixes: ['040','041','0421','0422','0423','0424','0425',
                       '0426','0432','0434','0438','0444','0445','045',
                       '0461','0471','0481','049']
          },
          5: {
            prefixes: ['050','051','0522','0521','0523','0532','0535',
                       '0536','0541','0543','0544','0545','0547','0549',
                       '055','0565','0571','0574','0575','0577','0583',
                       '0585','0586','059']
          },
          6: {
            prefixes: ['06']
          },
          7: {
            prefixes: ['070','071','0721','0731','0732','0733','0734',
                       '0735','0736','0737','075','0761','0765','0771',
                       '0773','0774','0775','0776','0783','0789','079']
          },
          8: {
            prefixes: ['080','081','0823','0824','0825','0832','085',
                       '0861','0862','0865','0874','0881','0882','0883',
                       '0884','089']
          },
          9: {
            prefixes: ['090','091','0921','0931','0932','0933','0924',
                       '0922','0925','0934','0941','0942','095','0961',
                       '0962','0963','07965','0974','0975','099','0984']
          }
        };

  let _errorMsg;
  let parts = TYPES.str(input).split('-'),
      prefix  = parts[0],
      number  = parts[1];

  const INTPREFIX = (prefix.substr(0, 2) === INTERNATIONAL_PRFX);
  const COUNTRYC  = INTPREFIX ? prefix.substr(2, 2) : prefix.substr(1, 2);
  const ISCONTRYC = COUNTRYC === COUNTRY_CODE;
  let startAt = 1;
  let type;
  let zone;

  // Is this an emergency or service number?
  if (SPECIALS.indexOf(input) !== -1) {
      return true;
  }

  if (parts.length !== 2) {
      _errorMsg  =  'Invalid Phone Number\n';
      _errorMsg +=  'The prefix must be indicated with the - character\n';
      _errorMsg +=  'Valid examples:\n';
      _errorMsg +=  'Landlines:\n';
      _errorMsg +=  '\t02-19838788, +3902-19838788, 003902-19838788\n';
      _errorMsg +=  'Mobile phones:\n';
      _errorMsg +=  '\t333-1111111, +39333-1111111, 0039333-1111111';
      throw _errorMsg;
  }

  if (ISCONTRYC) {
      startAt  = 4;
  }
  if (INTPREFIX) {
      startAt = 5;
  }

  type  = prefix.charAt(startAt - 1);
  zone  = prefix.charAt(startAt);

  if (!typeof number === "number") {
      return false;
  }

  if ( INTPREFIX && (!ISCONTRYC) ) {
      _errorMsg  =  'Invalid International prefix (';
      _errorMsg +=  INTERNATIONAL_PRFX + ')';
      _errorMsg += ' OR country code (+' + COUNTRY_CODE + ')';
      throw _errorMsg;
  }

  if ( prefix.indexOf('+') !== -1 && (!ISCONTRYC) ) {
      _errorMsg  = 'Invalid country code.\n'
      _errorMsg += 'Italy Contry Code (+' + COUNTRY_CODE +')';
      throw _errorMsg;
  }

  /*
   *  Telephone numbers in Italy
   *
   *  The number "0" identifies landlines:
   *      Landline numbers start with the digit 0 and are 6 to 10
   *      digits long
   *
   *  The number "3" identifies mobile phone numbers:
   *      The first 3 digits of the mobile phone numbers (prefix) identify
   *      the mobile network operator.
   *      Mobile phones are generally 10 digits long.
   */

  startAt -= 1;
  prefix   = prefix.substr(startAt, prefix.length);

  if (type === '0') { // landlines
      if (!ZONES[zone]) return false; // non-existent zone
      if (ZONES[zone].prefixes.indexOf(prefix) === -1) return false;
      if (number.length < 6 || number.length > 10) return false;

  } else if (type === '3') {
      // mobile phone
      if ((prefix.length + number.length) !== 10) return false;
  } else {
      // non-valid type - 0 for landlines 3 for mobile phones
      return false;
  }

  return true;
};

/**
 * Returns the input parameter text with all symbols removed.
 * Symbols refer to any non-alphanumeric character. A character is
 * considered alphanumeric if it matches one of the following:
 * a—z, A—Z, or 0—9. It ignores whitespace.
 * @memberof V
 * @param  {string} input The string to analyze.
 *
 * @example
 * // returns "Hi johndoelivecom, is that you"
 * sjs.V.withoutSymbols("Hi, john.doe@live.com., is that you?/");
 *
 * @returns {string} The input parameter text with all symbols removed
 */
V.withoutSymbols = (input) => {
  return TYPES.str(input).split('').map((item) => {
    const char = item.toLowerCase();
    return ((_ALPHA.indexOf(char) === -1) && item !== ' ') ? '' : item;
  }).join('');
};

/**
 * Checks if the input parameter text is a valid date.
 * For your purposes, a valid date is any string that can be turned into
 * a JavaScript Date Object.
 * @memberof V
 * @param   {string | Date}  input A string or a Date object
 *
 *
 * @returns {boolean} True or False
 */
V.isDate = (input) => {
  const customType = TYPES.allowedTypes('String', 'Date');
  // Chrome and Ie allow dates to be in the format DD-MM-YYYY
  // Safari, Firefox don't
  if (/\d{2}-\d{2}-\d{4}\b/.test(input)) {
    return false;
  }

  const date = new Date(customType(input));
  return !isNaN(date.getDate());
};

/**
 * Checks if the input parameter is a date that comes after the reference
 * date. Both the input and the reference can be strings or Date Objects.
 * This function relies on two valid dates; if two are not found,
 * it should throw a new error.
 * @memberof V
 * @param {string} or {date} input A value representing a valid Javascript
 *                                 date.
 * @param {string} or {date} reference A value representing a valid
 *                                     Javascript date.
 *
 * @returns {boolean} True or False
 */
V.isBeforeDate = (input, reference) => {
  const customType = TYPES.allowedTypes('String', 'Date');
  const d1 = new Date(customType(input));
  const d2 = new Date(customType(reference));

  if (!V.isDate(d1) || !V.isDate(d2)) {
    throw 'Invalid Date';
  }

  return d1 < d2;
};

/**
 * Checks if the input parameter is a date that comes before the reference
 * date. Both the input and the reference can be strings or Date Objects.
 * This function relies on two valid dates; if two are not found,
 * it should throw a new error.
 * @memberof V
 * @param {string} or {date} input A value representing a valid Javascript
 *                                 date.
 * @param {string} or {date} reference A value representing a valid
 *                                 Javascript date.
 *
 * @returns {boolean} True or False
 */
V.isAfterDate = (input, reference) => {
  const customType = TYPES.allowedTypes('String', 'Date');
  const d1 = new Date(customType(input));
  const d2 = new Date(customType(reference));

  if (!V.isDate(d1) || !V.isDate(d2)) {
    throw 'Invalid Date';
  }

  return d1 > d2;
};

/**
 * Checks if the input parameter is a date that comes before today.
 * The input can be either a string or a Date Object.
 * This function relies on two valid dates; if two are not found,
 * it should throw a new error.
 * @memberof V
 * @param {string} or {date} input A value representing a valid Javascript
 *                                 date.
 *
 * @returns {boolean} True or False
 */
V.isBeforeToday = (input) => {
  const customType = TYPES.allowedTypes('String', 'Date');
  const d1 = new Date(customType(input));
  const d2 = new Date();
  let days;

  if (!V.isDate(d1)) throw 'Invalid Date';

  days = ULYU.getDiffInDays(d1, d2);

  return days < 0;
};

/**
 * Checks if the input parameter is a date that comes after today.
 * The input can be either a string or a Date Object.
 * This function relies on two valid dates; if two are not found,
 * it should throw a new error.
 * @memberof V
 * @param {string} or {date} input A value representing a valid Javascript
 *                                 date.
 *
 * @returns {boolean} True or False
 */
V.isAfterToday = (input) => {
  const customType = TYPES.allowedTypes('String', 'Date');
  const d1 = new Date(customType(input));
  const d2 = new Date();
  let days;

  if (!V.isDate(d1)) throw 'Invalid Date';

  days = ULYU.getDiffInDays(d1, d2);

  return days > 0;
};

/**
 * Checks the input parameter and returns true if it is an empty string
 * a string with no length or characters that is represented as ""
 * or only contains whitespace(s).
 * @memberof V
 * @param {string} input The string to analyze.
 *
 * @example
 * // returns false
 * sjs.V.isEmpty("Visiting new places is fun.");
 * @example
 * // returns true
 * sjs.V.isEmpty(" ");
 * @example
 * // returns false
 * sjs.V.isEmpty(null);
 *
 * @returns {boolean} True or False
 */
V.isEmpty = (input) => {
  if (ULYF.notExists(input) || input.trim().length > 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if the input text parameter contains one or more of the words
 * within the words array. A word is defined as the following:
 * having undefined, whitespace, or punctuation before and after it.
 * The function is case-insensitive.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {Array} words A list of words to check.
 *
 * @example
 * // returns false
 * sjs.V.contains("Visiting new places is fun.", ["coconut"]);
 * @example
 * // returns false
 * sjs.V.contains("Visiting new places is fun.", ["aces"]);
 * @example
 * // returns true
 * sjs.V.contains("Visiting new places is fun.", ["places"]);
 * @example
 * // returns true
 * sjs.V.contains('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"]);
 *
 * @returns {boolean} True or False
 */
V.contains = (input, words) => {
  let wlen;
  let inputList;
  let i;

  words = TYPES.arr(words);
  input = TYPES.str(input).toLowerCase();
  wlen  = words.length;

  inputList = input.split('').map(item => {
    return ((_ALPHA.indexOf(item) === -1) && item !== ' ') ? ' ' : item;
  }).join('').split(' ');

  for (i = 0; i < wlen; i++) {
    if (inputList.indexOf(words[i].toLowerCase()) > -1) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if the input text parameter does not contain any of the words
 * within the words array. A word is defined as the following:
 * having undefined, whitespace, or punctuation before and after it.
 * The function is case-insensitive.
 * A function like this could be used for checking blacklisted words.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {Array} words A list of words to check.
 *
 * @example
 *  // returns true
 *  sjs.V.lacks("Visiting new places is fun.", ["coconut"]);
 * @example
 *  // returns true
 *  sjs.V.lacks("Visiting new places is fun.", ["aces"]);
 * @example
 *  // returns true
 *  sjs.V.lacks("Visiting new places is fun.", ["places"]);
 * @example
 * // returns false
 * sjs.V.lacks('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"]);
 *
 * @returns {boolean} True or False
 */
V.lacks = (input, words) => !V.contains.call(this, input, words);


/**
 * Checks that the input text parameter contains only strings found
 * within the strings array.
 * This function doesn’t use a strong word definition the way .contains and
 * .lacks does.
 * The function is case-insensitive.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {Array} words A list of words to check.
 * @example
 * // returns true
 * sjs.V.isComposedOf("10184", ["1", "2", "3", "4", "5", "6" ,"7", "8", "9", "0"]);
 * @example
 * // returns true
 * sjs.V.isComposedOf("I am ready.", ["I", "I'm", "am", "not", "ready"]);
 *
 * @returns {boolean} True or False
 */
V.isComposedOf = function(input, strings) {
  let result = TYPES.arr(strings).map(item => item.toString().toLowerCase())
                  .reduce((prev, curr) => {
                    return prev.toLowerCase().split(curr).join('');
                  },  TYPES.str(input)).trim();

  return result.length === 0;
};

/**
 * Checks if the input parameter’s character count is less than or
 * equal to the n parameter.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {integer} n The upper threshold
 *
 * @example
 * // false
 * sjs.V.isLength("123456789", 6);
 * @example
 * // true
 * sjs.V.isLength("123456789", 20);
 * @example
 * // true
 * sjs.V.isLength("AHHHH", 25);
 * @example
 * // true
 * sjs.V.isLength("This could be a tweet!", 140);
 *
 * @returns {boolean} True or False
 */
V.isLength = (input, n) => TYPES.str(input).length <= TYPES.int(n);


/**
 * Checks if the input parameter’s character count is greater than or
 * equal to the n parameter.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {integer} n The lower threshold
 *
 * @example
 * // true
 * sjs.V.isOfLength("123456789", 6);
 * @example
 * // false
 * sjs.V.isOfLength("123456789", 20);
 * @example
 * // false
 * sjs.V.isOfLength("AHHHH", 25);
 * @example
 * // false
 * sjs.V.isOfLength("This could be a tweet!", 140);
 *
 * @returns {boolean} True or False
 */
V.isOfLength = (input, n) => TYPES.str(input).length >= TYPES.int(n);


/**
 * Counts the number of words in the input parameter.
 * @memberof V
 * @param {string} input The string to analyze.
 *
 * @example
 * // returns 1
 * sjs.V.countWords("Hello.");
 * @example
 * // returns 5
 * sjs.V.countWords("Hard-to-type-really-fast!");
 * @example
 * // returns 0
 * sjs.V.countWords("");
 * @example
 * // returns 1
 * sjs.V.countWords("supercalifragilisticexpialidocious");
 *
 * @returns {integer} The number of contained words
 */
V.countWords = (input) => {
  input = TYPES.str(input).replace(/[^a-zA-Z\d\s\-:]/g, '');

  if (input.length === 0) {
    return 0;
  }

  return input.split('').map(function(item) {
    return (_ALPHA.indexOf(item.toLowerCase()) === -1) ? ' ' : item;
  }).join('').trim().split(' ').length;
};

/**
 * Checks if the input parameter has a word count less than or equal
 * to the n parameter.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {integer} n The upper threshold
 *
 * @returns {boolean} True or False
 */
V.lessWordsThan = (input, n) => V.countWords(input) <= TYPES.int(n);

/**
 * Checks if the input parameter has a word count greater than or equal to
 * the n parameter.
 * @memberof V
 * @param {string} input The string to analyze.
 * @param {integer} n The lower threshold
 *
 * @returns {boolean} True or False
 */
V.moreWordsThan = (input, n) => V.countWords(input) >= TYPES.int(n);


/**
 * Checks that the input parameter matches all of the following:
 *
 * - input is greater than or equal to the floor parameter
 * - input is less than or equal to the ceil parameter.
 * @memberof V
 * @param {Number | String } input The value to analyze.
 * @param {Number | String} floor The lower threshold
 * @param {Number | String} ceil The upper threshold
 *
 * @returns {boolean} True or False
 */
V.isBetween = function(input, floor, ceil) {
  const customType = TYPES.allowedTypes('String', 'NUMBER');
  input = customType(input);
  floor = customType(floor);
  ceil  = customType(ceil);

  return (input >= floor && input <= ceil);
};

/**
 * Checks that the input parameter string is only composed of the following
 * characters:  a—z, A—Z, or 0—9.
 * @memberof V
 * Unicode characters are intentionally disregarded.
 *
 * @param {string | Integer} input The value to be analyzed.
 *
 * @example
 * // returns false
 * sjs.V.isAlphanumeric("Hello.");
 * @example
 * // returns false
 * sjs.V.isAlphanumeric("slam poetry");
 * @example
 * // returns true
 * sjs.V.isAlphanumeric("");
 * @example
 * // returns false
 * sjs.V.isAlphanumeric("ArTᴉ$ʰARd");
 * @example
 * // returns true
 * sjs.V.isAlphanumeric("supercalifragilisticexpialidocious");
 *
 * @returns {boolean} True or False
 */
V.isAlphanumeric = function(input) {
  const customType = TYPES.allowedTypes('String', 'INTEGER');
  return customType(input).toString().split('').reduce((prev, curr) => {
    return (_ALPHA.indexOf(curr.toLowerCase()) === -1) ? false : prev;
  }, true);
};

/**
 * Checks if the input parameter is a credit card or bank card number.
 * A credit card number will be defined as four sets of four alphanumeric
 * characters separated by hyphens (-), or a single string of alphanumeric
 * characters (without hyphens).
 * @memberof V
 * @param {string} input A valid credit card number
 *
 * @example
 * // returns true
 * sjs.V.isCreditCard("1234-5678-9101-1121");
 * @example
 * // returns true
 * sjs.V.isCreditCard("1234567891011121");
 * @example
 * // returns true
 * sjs.V.isCreditCard("4427A693CF324D14");
 * @example
 * // returns true
 * sjs.V.isCreditCard("4427-A693-CF32-4D14");
 * @example
 * // returns false
 * sjs.V.isCreditCard("----------------");
 * @example
 * // returns false
 * sjs.V.isCreditCard("testcard");
 *
 * @returns {boolean} True or False
 */
V.isCreditCard = function isCreditCard(input) {
  input = TYPES.str(input);

  const firstT = V.countWords(input) === 4 && input.indexOf('-') !== -1;

  if (firstT) {
    input = V.withoutSymbols(input);
  }

  if (!V.isAlphanumeric(input) || input.length !== 16) {
    return false;
  }

  return true;
};

/**
 * Checks if the input string is a hexadecimal color, such as #3677bb.
 * Hexadecimal colors are strings with a length of 7 (including the #),
 * using the characters 0—9 and A—F. isHex should also work on shorthand
 * hexadecimal colors, such as #333.
 * The input must start with a # to be considered valid.
 * @memberof V
 * @param {string} input A valid Hexadecimal color
 *
 * @example
 * // returns true
 * sjs.V.isHex("#abcdef");
 * @example
 * // returns false
 * sjs.V.isHex("#bcdefg");
 * @example
 * // returns true
 * sjs.V.isHex("#bbb");
 * @example
 * // returns true
 * sjs.V.isHex("#1cf");
 * @example
 * // returns true
 * sjs.V.isHex("#1234a6");
 * @example
 * // returns true
 * sjs.V.isHex("#1234a68");
 * @example
 * // returns true
 * sjs.V.isHex("cc4488");
 *
 * @returns {boolean} True or False
 */
V.isHex = (input) => {
  const len = TYPES.str(input).length;
  const chars = input.substr(1).split('');

  if (input.charAt(0) !== '#') return false;
  if (len !== 4 && len !== 7) return false;

  return chars.reduce(function(prev, curr) {
    const chk1 = V.isBetween(curr, 'a', 'f');
    const chk2 = V.isBetween(curr, '0', '9');
    return (chk1 || chk2) ? prev : false;
  }, true);

};

/**
 * Checks if the input string is an RGB color, such as rgb(200, 26, 131).
 * An RGB color consists of:
 * - Three numbers between 0 and 255
 * - A comma between each number
 * - The three numbers should be contained within “rgb(” and “)“.
 * @memberof V
 * @param {string} input A valid RGB color
 *
 * @example
 * // returns true
 * sjs.V.isRGB("rgb(0,0,0)");
 * @example
 * // returns true
 * sjs.V.isRGB("rgb(0, 0, 0)");
 * @example
 * // returns true
 * sjs.V.isRGB("rgb(255, 255, 112)");
 * @example
 * // returns false
 * sjs.V.isRGB("rgba(0,0,0, 0)");
 * @example
 * // returns false
 * sjs.V.isRGB("rgb(0,300,0)");
 * @example
 * // returns false
 * sjs.V.isRGB("rgb(0,-14,0)");
 *
 * @returns {boolean} True or False
 */
V.isRGB = (input) => {
  const sanitized = TYPES.str(input).split('rgb(').join('').split(')').join('');
  const values   = sanitized.split(',');

  if (values.length !== 3) return false;

  return values.reduce(function(prev, curr) {
    return (V.isBetween(curr.trim(), '0', '255')) ? prev : false;
  }, true);
};

/**
 * Checks if the input string is an HSL color, such as hsl(122, 1, 1).
 * An HSL color consists of:
 * - Three numbers:
 *   • the first number, Hue, is between 0 and 360
 *   • the second and third numbers, Saturation and Lightness,
 *     are between 0 and 1
 * - A comma between each number
 * - The three numbers should be contained within “hsl(” and “)“.
 * @memberof V
 * @param {string} input A valid HSL color
 *
 * @returns {boolean} True or False
 */
V.isHSL = (input) => {
  const sanitized = TYPES.str(input).split('hsl(').join('').split(')').join('');
  const values   = sanitized.split(',');

  if (values.length !== 3) return false;

  if (!(V.isBetween(values[0].trim(), 0, 360))) return false;
  if (!(V.isBetween(values[1].trim(), 0, 1))) return false;
  if (!(V.isBetween(values[2].trim(), 0, 1))) return false;

  return true;
};

/**
 * Checks if the input parameter is a hex, RGB, or HSL color type.
 * @memberof V
 * @param {string} input A valid color (Hex, RGB, HSL)
 *
 * @example
 * // returns true
 * sjs.V.isColor("#ccccff");
 * @example
 * // returns true
 * sjs.V.isColor("rgb(255,255,200)");
 * @example
 * // returns true
 * sjs.V.isColor("hsl(46,0.66,0.21)");
 * @example
 * // returns false
 * sjs.V.isColor("hla(255,255,255)");
 * @example
 * // returns false
 * sjs.V.isColor("abc345");
 * @example
 * // returns true
 * sjs.V.isColor("#363");
 *
 * @returns {boolean} True or False
 */
V.isColor = (input) => V.isHex(input) || V.isRGB(input) || V.isHSL(input);


/**
 * Checks if the input parameter has leading or trailing whitespaces or too
 * many spaces between words.
 * Leading refers to before while trailing refers to after.
 * This function will help validate cases where extra spaces were added
 * accidentally by the user.
 * @memberof V
 * @param {string} input A string to analyze
 *
 * @example
 * // returns false
 * sjs.V.isTrimmed("   harmony and irony");
 * @example
 * // returns false
 * sjs.V.isTrimmed("harmony and irony      ");
 * @example
 * // returns false
 * sjs.V.isTrimmed("harmony  and  irony");
 * @example
 * // returns true
 * sjs.V.isTrimmed("harmony and irony");
 *
 * @returns {boolean} True or False
 */
V.isTrimmed = function isTrimmed(input) {
  const chars = TYPES.str(input).split(' ');

  return chars.reduce(function(prev, curr) {
    return (curr !=='') ? prev : false;
  }, true);
};

/**
 *  Check if the word arg is repeated within string
 * @memberof V
 * @param  {string} string The string where you want to search for
 * @param  {string} word The character or word you are looking for
 *
 * @example
 * // returns false
 * sjs.V.isConsecutive("apollo Cred", 'pol');
 * @example
 * // returns true
 * sjs.V.isConsecutive("apollo Cred", 'apoll');
 *
 * @returns {boolean} True if word is consecutive, False otherwise
 */
V.isConsecutive = (string, word) => {
  const substrings = TYPES.str(string).split(TYPES.str(word));

  for(var item in substrings) {
    if (!substrings[item]) return true;
  }
  return false;
};


// export public functions
export default { ...V };