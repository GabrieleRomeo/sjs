'use strict';

import { types as TYPES } from './functional';
import F from './functional';

/**
 * The DOM namespace.
 * This namespace contains a set of utility functions used to access and
 * manipulate the DOM
 * @namespace DOM
 */
const DOM = {};


/**
 * Queries the DOM in pursuit of the first HTML element that matches the CSS
 * query selector.
 * @memberof DOM
 * @param {string} selector A valid CSS selector
 * @param {string} [context] The ancestor where to start the research from
 *
 * @returns {Node} An HTML node or null
 */
DOM.$ = (selector, context) => (context || document).querySelector(TYPES.str(selector));


/**
 * Queries the DOM in pursuit of all the HTML elements that match the CSS
 * query selector.
 * @memberof DOM
 * @param {string} selector A valid CSS selector
 * @param {string} [context] The ancestor where to start the research from
 *
 * @returns {NodeList} An HTML Nodelist or null
 */
DOM.$$ = (selector, context) => (context || document).querySelectorAll(TYPES.str(selector));

/**
 * Find the nearest ancestor that matches any CSS selector with respect
 * to a given element
 * @memberof DOM
 * @param {HTMLNode} elem The HTML element to start from
 * @param {string} select The ancestor where to start the research from
 *
 * @returns {object} The HTML object or null
 */
DOM.getAncestorBySelector = (elem, selector) => {
    // Element.matches polyfill
  if (!Object.prototype.matches) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (i >= 0 && matches.item(i) !== this) {
            --i;
          }
          return i > -1;
        };
    }
  }

  // Get closest match
  for ( ; TYPES.HTMLNode(elem) && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches(TYPES.str(selector)) ) {
      return elem;
    }
  }

  return null;
};


/**
 * Return document.documentElement for Chrome and Safari, document.body otherwise
 * @memberof DOM
 * @return {Node}      document.documentElement or document.body
 */
DOM.getBody = () => {
  let body;
  document.documentElement.scrollTop += 1;
  body = ( document.documentElement.scrollTop !== 0 ) ?
                            document.documentElement  :
                            document.body;
  document.documentElement.scrollTop -= 1;
  return body;
};

/**
 * Get the element's distance from the top of the page
 * @memberof DOM
 * @param  {Node}  elem  The element
 * @return {Number}      An integer representing the distance from the of the page
 */
DOM.getElemDistanceFromTop = function(elem) {
  let location = 0;
  if ( TYPES.HTMLNode(elem).offsetParent ) {
    do {
      location += elem.offsetTop;
      elem = elem.offsetParent;
    } while ( elem );
  }
  return location >= 0 ? location : 0;
};

/**
 * Get all siblings of an element (if any)
 * @memberof DOM
 * @param  {String}  selector A valid CSS selector
 * @return {Array}   An array containing the siblings
 */
DOM.getSiblingsBySelector = (selector) => {
  const siblings = [];
  const elem = document.querySelector(TYPES.str(selector));
  let sibling = elem.parentNode.firstChild;

  // Get siblings
  for ( ; sibling; sibling = sibling.nextSibling ) {
    if ( sibling.nodeType === 1 && sibling !== elem ) {
      siblings.push( sibling );
    }
  }

  return siblings;
};

/**
 * Insert a new node after an existing node in the DOM
 * @memberof DOM
 * @param  {Node}  newNode The element you wish to insert
 * @param  {Node}  refNode The existing node in the DOM
 * @return {Node}  The element that was inserted
 */
DOM.insertAfter = (newNode, refNode) => {
  const p = refNode.parentNode;
  return p.insertBefore(TYPES.HTMLNode(newNode), TYPES.HTMLNode(refNode.nextSibling));
};

/**
 * Swap the position of two DOM elements
 * @memberof DOM
 * @param  {Node}  nodeA The first node
 * @param  {Node}  nodeB The second node
 * @return {Boolean}  It returns true if the swap was successful
 *                    and false otherwise
 */
DOM.swapElements = (nodeA, nodeB) => {
  const parentA = TYPES.HTMLNode(nodeA).parentNode;
  const parentB = TYPES.HTMLNode(nodeB).parentNode;
  let success = null;

  try {
    parentA.replaceChild(nodeB.cloneNode(true), nodeA);
    parentB.replaceChild(nodeA.cloneNode(true), nodeB);
    success = true;
  } catch (e) {
    success = false;
  }

  return success;
};

/**
 * Remove a number of elements from the page entirely
 * @memberof DOM
 * @param  {String}  selector A valid CSS selector
 * @return {Array}   An array containing the removed elements
 */
DOM.removeAll = (selector) => {
  const elements = Array.from(DOM.$$(selector) || []);
  elements.forEach((element) => element.parentNode.removeChild(element));
  return elements;
};

/**
 * Get the values a calculated CSS property for an element after applying
 * the active stylesheets
 * @memberof DOM
 * @param  {Node}   element The element for which to get the computed style
 * @return {CSSStyleDeclaration}
 */
DOM.getComputed = (element) => (property) => {
  return window.getComputedStyle(TYPES.HTMLNode(element), null)
               .getPropertyValue(TYPES.str(property));
};

/**
 * Get ViewPort's Info
 * @memberof DOM
 * @return {Object} An Object containing the viewport's height and width
 */
DOM.getViewPortInfo = () => {
  const body = DOM.getBody();
  const width = Math.max(body.clientWidth, window.innerWidth || 0);
  const height = Math.max(body.clientHeight, window.innerHeight || 0);
  return {
    height,
    width,
  };
};

/**
 * Get Page's Info
 * @memberof DOM
 * @return {Object} An object coontaining the page's height and width
 */
DOM.getPageInfo = () => {
  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight,
                          html.clientHeight, html.scrollHeight,
                          html.offsetHeight);
  const width = Math.max(body.scrollWidth, body.offsetWidth,
                          html.clientWidth, html.scrollWidth,
                          html.offsetWidth);

  return {
    height,
    width,
  };
};

/**
 * Get Element's Info
 * @memberof DOM
 * @return {Object} a DOMRect object which is the union of the rectangles
 *                  returned by getClientRects() for the element, i.e.,
 *                  the CSS border-boxes associated with the element.
 */
DOM.getElemInfo = (element) => TYPES.HTMLNode(element).getBoundingClientRect();

/**
 * Generate a document fragment if necessary
 * @memberof DOM
 * @access private
 * @param      {DocumentFragment | Node | Array}  children  The children to be
 *                                                           appended to the
 *                                                           document fragment
 * @return     {DocumentFragment}  A documentFragment containing the intended
 *                                 children
 */
const _generateFragment = (children = []) => {
  let frag = document.createDocumentFragment();
  const customT = TYPES.allowedTypes('DocumentFragment', 'HTMLNode');

  // Check if the provided arguments are allowed, then create the fragment
  F.arrayOf(customT)(children).forEach(child => frag.appendChild(child));

  return frag;
};

/**
 * It appends asynchronously a Node, or an Array containing nodes, or a
 * documentFragment to a parent Node
 * @memberof DOM
 * @param      {Node}   parent    The parent node
 * @param      {DocumentFragment | Node | Array}   children  The children that
 *                                                           you wish to append
 *                                                           to
 * @return     {Promise}  { It returns a Promise that can be exploited to
 *                          understand when the action will be satisfied or not.
 *                         }
 */
DOM.appendTo = (parent = document.body) => (...children) => {
  const fragment = _generateFragment(children);
  const append = F.asyncAction(Element.prototype.appendChild);
  return new Promise((resolve, reject) => {
    try {
      resolve(append(TYPES.HTMLNode(parent), fragment));
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * It prepends asynchronously a Node, or an Array containing nodes, or a
 * documentFragment to a target Node
 * @memberof DOM
 * @param      {Node}   target    The target node
 * @param      {DocumentFragment | Node | Array}   children  The children that
 *                                                           you wish to prepend
 *                                                           to
 * @return     {Promise}  { It returns a Promise that can be exploited to
 *                          understand when the action will be satisfied or not.
 *                         }
 */
DOM.prependTo = (target = document.body.firstChild) => (...children) => {
  const fragment = _generateFragment(children);
  const prepend = F.asyncAction(Element.prototype.insertBefore);
  return new Promise((resolve, reject) => {
    try {
      resolve(prepend(TYPES.HTMLNode(target), fragment, target.firstChild));
    } catch (e) {
      reject(e);
    }
  });

};

// export public functions
export default { ...DOM };