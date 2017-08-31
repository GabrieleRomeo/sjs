# sjs *1.0.0*

> A JS Library with special attention to Data Types.


### src/animations.js


#### A() 

The Animations namespace.
This namespace contains a set of utility functions used for animations.






##### Returns


- `Void`



#### A.getEasing([easingName]) 

Get an easing function




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| easingName | `String`  | The easing function's name you are looking for.                                Available easing functions: 'linear', 'easeInQuad',<br>                               'easeOutQuad', 'easeInOutQuad', 'easeInCubic',<br>                               'easeOutCubic', 'easeInOutCubic', 'easeInQuart',<br>                               'easeOutQuart', 'easeInOutQuart', 'easeInQuint',<br>                               'easeOutQuint', 'easeInOutQuint' | *Optional* |




##### Returns


- `Function`  The easing function (if any) or linear (default)



#### A.scrollTo(element, options, callback) 

Scroll the window to the element position




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `Node`  | An HTML node towards which you wish to scroll                             the window | &nbsp; |
| options | `Object`  | Animation's options (easing type and duration) | &nbsp; |
| callback | `Function`  | An optional callback | &nbsp; |




##### Returns


- `Void`




### src/DOM.js


#### DOM() 

The DOM namespace.
This namespace contains a set of utility functions used to access and
manipulate the DOM






##### Returns


- `Void`



#### DOM.$(selector[, context]) 

Queries the DOM in pursuit of the first HTML element that matches the CSS
query selector.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| selector | `string`  | A valid CSS selector | &nbsp; |
| context | `string`  | The ancestor where to start the research from | *Optional* |




##### Returns


- `Node`  An HTML node or null



#### DOM.$$(selector[, context]) 

Queries the DOM in pursuit of all the HTML elements that match the CSS
query selector.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| selector | `string`  | A valid CSS selector | &nbsp; |
| context | `string`  | The ancestor where to start the research from | *Optional* |




##### Returns


- `NodeList`  An HTML Nodelist or null



#### DOM.getAncestorBySelector(elem, select) 

Find the nearest ancestor that matches any CSS selector with respect
to a given element




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| elem | `HTMLNode`  | The HTML element to start from | &nbsp; |
| select | `string`  | The ancestor where to start the research from | &nbsp; |




##### Returns


- `Node`  An HTML Node or null



#### DOM.getBody() 

Return document.documentElement for Chrome and Safari, document.body otherwise






##### Returns


- `Node`  document.documentElement or document.body



#### DOM.getElemDistanceFromTop(elem) 

Get the element's distance from the top of the page




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| elem | `Node`  | The element | &nbsp; |




##### Returns


- `Number`  An integer representing the distance from the of the page



#### DOM.getSiblingsBySelector(selector) 

Get all siblings of an element (if any)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| selector | `String`  | A valid CSS selector | &nbsp; |




##### Returns


- `Array`  An array containing the siblings



#### DOM.insertAfter(newNode, refNode) 

Insert a new node after an existing node in the DOM




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newNode | `Node`  | The element you wish to insert | &nbsp; |
| refNode | `Node`  | The existing node in the DOM | &nbsp; |




##### Returns


- `Node`  The element that was inserted



#### DOM.swapElements(nodeA, nodeB) 

Swap the position of two DOM elements




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nodeA | `Node`  | The first node | &nbsp; |
| nodeB | `Node`  | The second node | &nbsp; |




##### Returns


- `Boolean`  It returns true if the swap was successful                    and false otherwise



#### DOM.removeAll(selector) 

Remove a number of elements from the page entirely




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| selector | `String`  | A valid CSS selector | &nbsp; |




##### Returns


- `Array`  An array containing the removed elements



#### DOM.getComputed(element) 

Get the values a calculated CSS property for an element after applying
the active stylesheets




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `Node`  | The element for which to get the computed style | &nbsp; |




##### Returns


- `CSSStyleDeclaration`  



#### DOM.getViewPortInfo() 

Get ViewPort's Info






##### Returns


- `Object`  An Object containing the viewport's height and width



#### DOM.getPageInfo() 

Get Page's Info






##### Returns


- `Object`  An object coontaining the page's height and width



#### DOM.getElemInfo() 

Get Element's Info






##### Returns


- `Object`  a DOMRect object which is the union of the rectangles                  returned by getClientRects() for the element, i.e.,
                 the CSS border-boxes associated with the element.



#### _generateFragment(children) 

Generate a document fragment if necessary




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| children | `DocumentFragment` `Node` `Array`  | The children to be                                                           appended to the<br>                                                          document fragment | &nbsp; |




##### Returns


- `DocumentFragment`  A documentFragment containing the intended                                 children



#### DOM.appendTo(children) 

It returns a reference to a parent Node, then you can exploit this reference
to add asynchronously a node, an Array of nodes, or a documentFragment
to the parent.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent&#x3D;document.body | `Node`  | The parent node | *Optional* |
| children | `DocumentFragment` `Node` `Array`  | A document fragment,                                                           or a single Node,<br>                                                          or an Array of Nodes<br>                                                          you wish to append<br>                                                          to the target Node. | &nbsp; |




##### Examples

```javascript
<caption>Append a new document fragment without providing a parent                    node</caption>
let fragment = document.createDocumentFragment();
let node = document.createElement('DIV');
node.textContent = 'New Node';
fragment.appendChild(node);

// By default, the parent node is document.body
let append = sjs.appendTo();
append(fragment);
```
```javascript
<caption>Append a new node to an existing Node</caption> let parentNode = document.createElement('DIV');
parentNode.textContent = 'The parent Node';
// append synchronously parentNode to document.body
document.body.appendChild(parentNode);

let child = document.createElement('DIV');
child.textContent = 'A Child Node';

// Create a reference to the parent node
let appendToParent = sjs.DOM.appendTo(parentNode);
// append asynchronously the child Node to the parent Node
appendToParent(child);

// create a new child
let anotherChild = document.createElement('DIV');
anotherChild.textContent = 'Another Child Node';

// Using the previous reference, append the new Node to the parent Node
appendToParent(anotherChild);
```


##### Returns


- `function`  A function that accepts a documentFragment, a single                          node, or an Array of Nodes and returns a Promise.
- `Promise`  It returns a Promise that can be exploited to                        understand when the action will be satisfied or not.



#### DOM.prependTo(children) 

It prepends asynchronously a Node, or an Array containing nodes, or a
documentFragment to a target Node




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| target&#x3D;document.body.firstChild | `Node`  | The target node | *Optional* |
| children | `DocumentFragment` `Node` `Array`  | A document fragment,                                                           or a single Node,<br>                                                          or an Array of Nodes<br>                                                          you wish to prepend<br>                                                          to the target Node. | &nbsp; |




##### Returns


- `function`  A function that accepts a documentFragment, a single                          node, or an Array of Nodes and returns a Promise.
- `Promise`  It returns a Promise that can be exploited to                        understand when the action will be satisfied or not.




### src/extras.js


#### E() 

The Extras namespace.
This namespace contains a set of extras functions






##### Returns


- `Void`



#### E.EventEmitter() 

An Event Emitter which emits events






##### Returns


- `Void`



#### on(event, listener) 

The on method allows us to associate a listener to a particular event.
Every time the Event Emitter emits the intended event, each associated
listener will be called accordingly




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| event | `String`  | The event's name | &nbsp; |
| listener | `Function`  | The listener you wish to attach to the event | &nbsp; |




##### Returns


- `Void`



#### removeListener(event, listener) 

Removes a listener.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| event | `String`  | The event's name | &nbsp; |
| listener | `Function`  | The listener you wish to remove from the event | &nbsp; |




##### Returns


- `Void`



#### emit(event) 

The event you wish to emit




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| event | `String`  | The event's name | &nbsp; |




##### Returns


- `Void`



#### once(event, listener) 

The once method allows us to emit a particular event just once.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| event | `String`  | The event's name | &nbsp; |
| listener | `Function`  | The listener you wish to attach to the event | &nbsp; |




##### Returns


- `Void`



#### E.Queue() 

A Queue object which emits events during its lifetime






##### Returns


- `Void`



#### enqueue(item) 

Add an item at the end of the queue.
It emits the `enqueue` event




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `Value`  | The item to be added into the Queue | &nbsp; |




##### Returns


- `Void`



#### dequeue() 

Remove the item at the head of the queue and emits the `dequeue` event.
If the removed item is the last one into the Queue, it also emits the `empty`
 event.






##### Returns


- `Value`  The first item of the Queue



#### isEmpty() 

Determines if empty.






##### Returns


- `boolean`  True if empty, False otherwise.



#### E.Stack() 

A Stack object which emits events during its lifetime






##### Returns


- `Void`



#### push(item) 

Add an item onto the Stack and emits the `push` event




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `Value`  | The item to be added onto the Stack | &nbsp; |




##### Returns


- `Void`



#### pop() 

Remove the last item of the Stack and emits the `pop` event.
If the removed item is the last one into the Stack, it also emits the `empty`
 event.






##### Returns


- `Value`  The last item of the Stack



#### isEmpty() 

Determines if empty.






##### Returns


- `boolean`  True if empty, False otherwise.



#### E.$http(url) 

A convenient way to handle Ajax Requests




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | The url | &nbsp; |




##### Returns


- `Object` `Promise`  An object containing the allowed CRUD                                  operations. Each operation returns a Promise
                                 which can be used to follow up with its status




### src/functional.js


#### F() 

The Functional Programming namespace.
This namespace contains a list of functions written in functional style






##### Returns


- `Void`



#### F.curry(fn, n) 

Takes a Function with {N} parameters and splits it in a series of
functions each taking a single argument. It allows you to provide an
optional parameter 'n' which sets the function's arity.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | A function to be curried | &nbsp; |
| n | `Integer`  | An optional integer representing the arity of the                      fn function | &nbsp; |




##### Returns


- `Function`  It returns a series of functions each taking a                     single argument.



#### F.rcurry(fn, n) 

Takes a Function with {N} parameters and splits it in a series of
functions each taking a single argument. It allows you to provide an
optional parameter 'n' which sets the function's arity. Unlike curry,
rcurry curries a function's arguments from right to left.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | A function to be curried | &nbsp; |
| n | `Integer`  | An optional integer representing the arity of the                      fn function | &nbsp; |




##### Returns


- `Function`  It returns a series of functions each taking a                     single argument.



#### F.map() 








##### Returns


- `Void`



#### F.arrayOf() 








##### Returns


- `Void`



#### F.compose() 








##### Returns


- `Void`



#### F.toArray() 








##### Returns


- `Void`



#### F.flip() 








##### Returns


- `Void`



#### F.rcompose() 








##### Returns


- `Void`



#### F.toLower() 








##### Returns


- `Void`



#### F.toUpper() 








##### Returns


- `Void`



#### F.capitalize() 








##### Returns


- `Void`



#### F.unary() 








##### Returns


- `Void`



#### F.once() 

Executes a function just once






##### Examples

```javascript
// sjs.U.generateGUID generates a unique GUID
const uniqueID = sjs.F.once(sjs.U.generateGUID);
// returns a string like "63651124-d561-1897-36c8-53058d87519c"
uniqueID();

// return undefined
uniqueID();

// return undefined
uniqueID();
```


##### Returns


- `Void`



#### F.getWith() 








##### Returns


- `Void`



#### F.forEachObject() 








##### Returns


- `Void`



#### F.unless() 








##### Returns


- `Void`



#### F.head() 








##### Returns


- `Void`



#### F.tail() 








##### Returns


- `Void`



#### F.sortBy() 








##### Returns


- `Void`



#### F.flatten() 








##### Returns


- `Void`



#### F.zip() 








##### Returns


- `Void`



#### F.times() 








##### Returns


- `Void`



#### F.memoized() 








##### Returns


- `Void`



#### F.not() 








##### Returns


- `Void`



#### F.asyncAction() 

asyncAction :: Function -> Function






##### Returns


- `Void`



#### F.maybe(fn) 

It calls the 'fn' function if and only if the provided parameters
are neither null nor undefined




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Object`  | The function that could be applied | &nbsp; |




##### Returns


- `value`  The fn's evalutation or undefined



#### F.classOf(value) 

Provides the actual dataType of the provided argument




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `value`  | The value under test | &nbsp; |




##### Examples

```javascript
// returns "Number"
sjs.F.classOf(5);
```
```javascript
// returns "Object"
sjs.F.classOf({});
```


##### Returns


- `string`  The datatype's name



#### F.exists(x) 

Check if the provided value is neither Null nor Undefined




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| x | `value`  | The value under test | &nbsp; |




##### Returns


- `boolean`  



#### F.notExists(x) 

Check if the provided value is neither Null nor Undefined




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| x | `value`  | The value under test | &nbsp; |




##### Returns


- `boolean`  



#### F.contains(object, x) 

Check if an object contains a specific key




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `Object`  | The Object under test | &nbsp; |
| x | `String`  | The value under test | &nbsp; |




##### Examples

```javascript
let obj = {
 color: 'red'
};

// returns true
sjs.F.contains(obj, 'color');
```


##### Returns


- `String` `Undefined`  




### src/types.js


#### str(arg) 

Checks if the provided Data Type is a String. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `String`  | - A string | &nbsp; |




##### Examples

```javascript
// returns 'Hello World'
sjs.types.str('Hello World');

// throws TypeError - Error: expected STRING but provided ARRAY
sjs.types.str([]);

// returns 'hello world'
sjs.types.str('Hello World').toLowerCase();
```


##### Returns


- `String`  The same value without any changes.



#### num(arg) 

Checks if the provided Data Type is a Number. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Number`  | - A Number (an Integer or a Float) | &nbsp; |




##### Examples

```javascript
// returns 123.100
sjs.types.num(123.100);

// returns 5
sjs.types.num(5);

// throws TypeError - Error: expected NUMBER but provided ARRAY
sjs.types.num([]);
```


##### Returns


- `Number`  The same value without any changes.



#### int(arg) 

Checks if the provided Data Type is an Integer. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Integer`  | - An Integer | &nbsp; |




##### Examples

```javascript
// returns 1
sjs.types.int(1);

// throws TypeError - Error: expected INTEGER but provided NUMBER
sjs.types.int(2.2);
```


##### Returns


- `Integer`  The same value without any changes.



#### fun(arg) 

Checks if the provided Data Type is a Function. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Function`  | - A Function | &nbsp; |




##### Examples

```javascript
// returns function callback() {}
sjs.types.fun(function callback() {});

// throws TypeError - Error: expected FUNCTION but provided NUMBER
sjs.types.fun(2);
```


##### Returns


- `Function`  The same value without any changes.



#### bool(arg) 

Checks if the provided Data Type is a Boolean. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Boolean`  | - A Boolean | &nbsp; |




##### Examples

```javascript
// returns true
sjs.types.bool(true);

// throws TypeError - Error: expected BOOLEAN but provided STRING
sjs.types.bool('Hi!');
```


##### Returns


- `Boolean`  The same value without any changes.



#### date(arg) 

Checks if the provided Data Type is a Date. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Date`  | - A Date | &nbsp; |




##### Examples

```javascript
// returns Tue Jan 31 2017 01:00:00 GMT+0100 (CET)
sjs.types.date(new Date('2017-01-31'));

// throws TypeError - Error: expected DATE but provided STRING
sjs.types.date('hello');
```


##### Returns


- `Date`  The same value without any changes.



#### obj(arg) 

Checks if the provided Data Type is an Object. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Object`  | - An Object | &nbsp; |




##### Examples

```javascript
// returns {number: 10, color: 'red'}
sjs.types.obj({number: 10, color: 'red'});

// throws TypeError - Error: expected OBJECT but provided DATE
sjs.types.obj(new Date());
```


##### Returns


- `Object`  The same value without any changes.



#### arr(arg) 

Checks if the provided Data Type is an Array. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Array`  | - An Array | &nbsp; |




##### Examples

```javascript
// returns [1, 2, 4]
sjs.types.arr([1, 2, 4]);

// throws TypeError - Error: expected ARRAY but provided DATE
sjs.types.arr(new Date());
```


##### Returns


- `Array`  The same value without any changes.



#### sym(arg) 

Checks if the provided Data Type is a Symbol. Otherwise the System throws a
TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Symbol`  | - A Symbol | &nbsp; |




##### Examples

```javascript
// returns Symbol(foo)
sjs.types.sym(Symbol('foo'));

// throws TypeError - Error: expected SYMBOL but provided STRING
sjs.types.sym('symbol');
```


##### Returns


- `Symbol`  The same value without any changes.



#### regex(arg) 

Checks if the provided Data Type is a Regular Expression. Otherwise the
System throws a TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `RegExp`  | - A RegExp | &nbsp; |




##### Examples

```javascript
// returns /abc/i
sjs.types.regex(/abc/i);

// throws TypeError - Error: expected REGEXP but provided NUMBER
sjs.types.regex(000);
```


##### Returns


- `RegExp`  The same value without any changes.



#### HTMLNode(arg) 

Checks if the provided Data Type is an HTML Node. Otherwise the
System throws a TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `Node`  | - An HTML Node | &nbsp; |




##### Examples

```javascript
// returns <body>...</body>
sjs.types.HTMLNode(document.querySelector('body'));

// throws TypeError - Error: expected HTMLNODE but provided NUMBER
sjs.types.HTMLNode(10);
```


##### Returns


- `Node`  The same value without any changes.



#### HTMLNodeList(arg) 

Checks if the provided Data Type is an HTML NodeList. Otherwise the
System throws a TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `NodeList`  | - An HTML NodeList | &nbsp; |




##### Examples

```javascript
// returns a NodeList containing all the page's DIVs
sjs.types.HTMLNodeList(document.querySelectorAll('DIV'));

// throws TypeError - Error: expected NODELIST but provided NUMBER
sjs.types.HTMLNodeList(10);
```


##### Returns


- `NodeList`  The same value without any changes.



#### HTMLFragment(arg) 

Checks if the provided Data Type is a DocumentFragment. Otherwise the System
throws a TypeError




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arg | `DocumentFragment`  | - A DocumentFragment | &nbsp; |




##### Examples

```javascript
// returns #document-fragment
sjs.types.HTMLFragment(document.createDocumentFragment());

// throws TypeError - Error: expected DOCUMENTFRAGMENT but provided STRING
sjs.types.HTMLFragment('document');
```


##### Returns


- `DocumentFragment`  The same value without any changes.



#### defineType(-) 

Allows the User to define a new identity function for a custom Data Type




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| - | `String`  | The Data Type's name | &nbsp; |




##### Examples

```javascript
const mutObserver = sjs.types.defineType('MutationObserver');

// Somewhere in your code, you can check if the provided argument is
// of the intended type
function list(Array, Observer) {
  Array = sjs.types.arr(Array);
  Observer = mutObserver(Observer);
  // ...
}
```


##### Returns


- `Function`  - A function which validates the custom Data Type



#### allowedTypes(-) 

Provides the User s way to specify a list of allowed Data Types for a specific
argument.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| - | `String`  | A list of allowed Data Types | &nbsp; |




##### Examples

```javascript
function checkDate(value) {
  const types = sjs.allowedTypes('String', 'Date');
  // value must be a String or a Date
  const date = new Date(types(value));
  return date;
}
```


##### Returns


- `Function`  - A function which validates the allowed Data Types



#### typeOf() 

Given a data type, it returns a function that, when applied, checks if
the provide value is of the intended data type






##### Returns


- `Void`




### src/utilities.js


#### U() 

The Utilities namespace.
This namespace contains a set of utility functions used for a variety of things.
For example the evaluation of arguments or the generation of random integer
or Guid






##### Returns


- `Void`



#### U.by(list, n, n) 

Iterates and calls the callback parameter for each element or property
of a list at the interval specified by the n parameter.
It does not call callback on values greater than the list’s number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| list | `Array`  | The list of values | &nbsp; |
| n | `int`  | An interval used as step of the iteration | &nbsp; |
| n | `Func`  | A callback function applied on the elements within the                 step | &nbsp; |




##### Examples

```javascript
let result = [];
const double = (x) => result.push(x * 2);
sjs.U.by([1, 2, 3, 4, 5, 6], 2, double);
// result now contains [4, 8, 12]
```


##### Returns


-  



#### U.keys(object) 

Creates an array of all the keys of an object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `Object`  | The object used as a template | &nbsp; |




##### Returns


- `Array`  An Array containing all the keys of the provided object



#### U.values(object) 

Creates an array containing all the values of the provided object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `Object`  | The object used as a template | &nbsp; |




##### Examples

```javascript
const obj = {
   key1: 'Value one!',
   key2: 'Value two!!!'
};
// returns ['Value one!', 'Value two!!!']
sjs.U.values(obj);
```


##### Returns


- `Array`  An Array containing all the values of the provided                  object



#### U.pairs(object) 

Creates an array of all keys and values of an object in the order of
[key, value, key, value] for as many key/value pairs as exist in the
object.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `Object`  | The object used as a template | &nbsp; |




##### Examples

```javascript
// returns ["count", 5, "length", 10, "total", 16]
pairs({count: 5, length: 10, total: 16});
```


##### Returns


- `Array`  An Array containing all keys and values pairs of the provided                  object



#### U.shuffle(object) 

Returns a randomly re-arranged copy of the elements in its parameter
array.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `Array`  | The Array used as a template | &nbsp; |




##### Examples

```javascript
 let arr = [1,2,3,4,5];
 // returns a new array containing shuffled elements like: [2,4,5,3,1]
 sjs.U.shuffle(arr);
```


##### Returns


- `Array`  A randomly re-arranged copy of the original Array



#### U.pluralize(n, word, pluralWord) 

Returns the plural of a word depending on the value of the n parameter.
If n is 1, return the non-plural word (parameter word);
otherwise, add an “s” to the plural word.
If the pluralWord parameter is provided, instead of adding an “s,”
return the pluralWord.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `int`  | The number of "s" | &nbsp; |
| word | `String`  | A non-plural word | &nbsp; |
| pluralWord | `String`  | An optional plural word | &nbsp; |




##### Examples

```javascript
// returns "lion"
sjs.U.pluralize(1, "lion");
```
```javascript
// returns "lions"
sjs.U.pluralize(2, "lion");
```
```javascript
// returns "lions"
sjs.U.pluralize(5, "lion");
```
```javascript
// returns "lions"
sjs.U.pluralize(0, "lion");
```
```javascript
// returns "lioness"
sjs.U.pluralize(1, "lioness");
```
```javascript
// returns "lionesss"
sjs.U.pluralize(2, "lioness");
```
```javascript
// "lionesses"
sjs.U.pluralize(2, "lioness", "lionesses);
```


##### Returns


- `String`  A pluralized string



#### U.toDash(str) 

Converts a camelCase string to a dashed string.
Camel case presents words with no spaces separating them and with
each word’s first letter capitalized except the first word,
which is lower case.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `string`  | A camelCase string | &nbsp; |




##### Examples

```javascript
// returs hot-dog
toDash(hotDog);
```
```javascript
// returs space-station-complex
toDash(spaceStationComplex);
```
```javascript
// returns my-first-function
toDash(myFirstFunction);
```


##### Returns


- `String`  A dashed string



#### U.toCamel(str) 

Converts a dashed string to a camel case string.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `string`  | A dashed string | &nbsp; |




##### Examples

```javascript
// returns hot-dog
toCamel(hot-dog);
```
```javascript
// returns spaceStationComplex
 toCamel(space-station-complex);
```


##### Returns


- `String`  A camelCase string



#### U.has(obj, search) 

Searches through all the [values] of the provided object and returns “true”
if any of them matches the query string. Otherwise it returns “false”.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  | An object | &nbsp; |
| search | `String`  | The string you are looking for | &nbsp; |




##### Returns


- `boolean`  {(True|False)} True if any of the values match the query                                    string. False otherwise.



#### U.pick(obj, keys) 

Returns a new object by picking all key/value pairs from the argument
obj.
The keys that are picked will be determined by the array parameter keys.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  | An object | &nbsp; |
| keys | `Array`  | A list of keys | &nbsp; |




##### Examples

```javascript
 var data = {
    type: "transformer",
    index: 19,
    siblings: 19,
    access: "full"
};

// returns {type: "transformer", index: 19};
sjs.U.pick(data, ["type", "index"]);

// returns {siblings: 19, index: 19};
sjs.U.pick(data, ["siblings", "index"]);

// returns {access: "full"};
sjs.U.pick(data, ["access", "animals"]);
```


##### Returns


- `Object`  An object which is composed by the requested keys



#### U.replaceAll(text, search, replace) 

Replaces all occurencies of a particular search string with another
string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| text | `String`  | A string used as a base for the search | &nbsp; |
| search | `String`  | A string you are looking for the replace | &nbsp; |
| replace | `String`  | A string used as replacing | &nbsp; |




##### Examples

```javascript
// returns Hell? W?rld!
sjs.U.replaceAll('Hello World!', 'o', '?');
```


##### Returns


- `String`  A new string with all occurrencies replaced



#### U.getRandomInt([max, min]) 

Get a random integer




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| max | `Number`  | The upper limit (defualt 10 - not included) | *Optional* |
| min | `Number`  | The lower limit (default 0 - included) | *Optional* |




##### Returns


- `Number`  A random integer from min to max



#### U.getIncRandomInt([max, min]) 

Get a random integer (inclusive)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| max | `Number`  | The upper limit (defualt 10 - included) | *Optional* |
| min | `Number`  | The lower limit (default 0 - included) | *Optional* |




##### Returns


- `Number`  A random integer from min to max



#### U.getCookie(name) 

Retrieve the value of a particular cookie through its name




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | The cookie's name | &nbsp; |




##### Returns


- `string`  Returns the value of the intended cookie                                or undefined



#### U.getCookies([name]) 

Get an object containing all the existing cookies or a single cookie (if any)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | The cookie's name | *Optional* |




##### Returns


- `Object`  Return an object containing all cookies, the intended                      cookie (if the name argument has been provided), or
                     an empty object



#### U.generateGUID() 

Generate a random GUID






##### Examples

```javascript
// returns a string like "171d531b-54b1-cd9b-11b0-7951130e68d4"
sjs.U.generateGUID();
```


##### Returns


- `String`  



#### U.getDayName(dayNumber) 

Given a day number it returns the day name or "Unknown".
(0 - Sunday || 6 - Saturday)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dayNumber | `Number`  | The day number | &nbsp; |




##### Examples

```javascript
// returns "Sunday"
sjs.U.getDayName(0);

// returns "Wednesday"
sjs.U.getDayName(3);

// returns "Unknown"
sjs.U.getDayName(7);
```


##### Returns


- `string`  The day name.



#### U.getDiffInDays(Date, Date) 

Given two dates it returns the difference between them in days




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| Date | `d1`  | The first date | &nbsp; |
| Date | `d2`  | The second date | &nbsp; |




##### Examples

```javascript
// returns 9
sjs.U.getDiffInDays(new Date('2017-05-10'), new Date('2017-05-01'));
```


##### Returns


- `int`  The difference in days




### src/validators.js


#### V() 

The Validators namespace.
This namespace contains a set of Utility Functions useful to validate inputs,
check data type, check Dates, etc..






##### Returns


- `Void`



#### V.isArray(arr) 

Checks if the provided argument is an Array




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arr | `Array`  | An Array | &nbsp; |




##### Returns


- `Boolean`  True | False



#### V.isFunc(fn) 

Checks if the provided argument is a Function




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Fun`  | A Function | &nbsp; |




##### Returns


- `Boolean`  True | False



#### V.isString(str) 

Checks if the provided argument is a String




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `str`  | A String | &nbsp; |




##### Returns


- `Boolean`  True | False



#### V.isNumber(num) 

Checks if the provided argument is a Number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| num | `Number`  | A Number | &nbsp; |




##### Returns


- `Boolean`  True | False



#### V.isInt(num) 

Checks if the provided argument is an Integer




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| num | `Number`  | A Number | &nbsp; |




##### Returns


- `Boolean`  True | False



#### V.isEmailAddress(input) 

Checks if the provided input is a valid email address

It checks for the presence of duplicated dots inside the local and domain
parts.
This function does not use Regular Expressions




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string representing a valid email address. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isPhoneNumber(input) 

Checks if the provided input is a valid ITALIAN phone number

LANDLINE NUMBERS and MOBILE PHONES

Phone numbers in Italy have variable length. There's no well established
convention about how to group digits or which symbol to use, but this is
hardly an issue since all the digits are always dialed.

This evaluation shall take into account also of the country code (+39),
international prefix (00) and emergency or service numbers

Valid numbers:
     Landline : 02-19838788, +3902-19838788, 003902-19838788
     Mobile   : 333-1111111, +39333-1111111, 0039333-1111111

This function does not use Regular Expressions




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string representing a valid phone number. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.withoutSymbols(input) 

Returns the input parameter text with all symbols removed.
Symbols refer to any non-alphanumeric character. A character is
considered alphanumeric if it matches one of the following:
a—z, A—Z, or 0—9. It ignores whitespace.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |




##### Examples

```javascript
// returns "Hi johndoelivecom, is that you"
sjs.V.withoutSymbols("Hi, john.doe@live.com., is that you?/");
```


##### Returns


- `string`  The input parameter text with all symbols removed



#### V.isDate(input) 

Checks if the input parameter text is a valid date.
For your purposes, a valid date is any string that can be turned into
a JavaScript Date Object.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string` `Date`  | A string or a Date object | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isBeforeDate(or, or) 

Checks if the input parameter is a date that comes after the reference
date. Both the input and the reference can be strings or Date Objects.
This function relies on two valid dates; if two are not found,
it should throw a new error.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| or | `string`  | {date} input A value representing a valid Javascript                                 date. | &nbsp; |
| or | `string`  | {date} reference A value representing a valid                                     Javascript date. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isAfterDate(or, or) 

Checks if the input parameter is a date that comes before the reference
date. Both the input and the reference can be strings or Date Objects.
This function relies on two valid dates; if two are not found,
it should throw a new error.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| or | `string`  | {date} input A value representing a valid Javascript                                 date. | &nbsp; |
| or | `string`  | {date} reference A value representing a valid                                 Javascript date. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isBeforeToday(or) 

Checks if the input parameter is a date that comes before today.
The input can be either a string or a Date Object.
This function relies on two valid dates; if two are not found,
it should throw a new error.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| or | `string`  | {date} input A value representing a valid Javascript                                 date. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isAfterToday(or) 

Checks if the input parameter is a date that comes after today.
The input can be either a string or a Date Object.
This function relies on two valid dates; if two are not found,
it should throw a new error.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| or | `string`  | {date} input A value representing a valid Javascript                                 date. | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isEmpty(input) 

Checks the input parameter and returns true if it is an empty string
a string with no length or characters that is represented as ""
or only contains whitespace(s).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |




##### Examples

```javascript
// returns false
sjs.V.isEmpty("Visiting new places is fun.");
```
```javascript
// returns true
sjs.V.isEmpty(" ");
```
```javascript
// returns false
sjs.V.isEmpty(null);
```


##### Returns


- `boolean`  True or False



#### V.contains(input, words) 

Checks if the input text parameter contains one or more of the words
within the words array. A word is defined as the following:
having undefined, whitespace, or punctuation before and after it.
The function is case-insensitive.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| words | `Array`  | A list of words to check. | &nbsp; |




##### Examples

```javascript
// returns false
sjs.V.contains("Visiting new places is fun.", ["coconut"]);
```
```javascript
// returns false
sjs.V.contains("Visiting new places is fun.", ["aces"]);
```
```javascript
// returns true
sjs.V.contains("Visiting new places is fun.", ["places"]);
```
```javascript
// returns true
sjs.V.contains('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"]);
```


##### Returns


- `boolean`  True or False



#### V.lacks(input, words) 

Checks if the input text parameter does not contain any of the words
within the words array. A word is defined as the following:
having undefined, whitespace, or punctuation before and after it.
The function is case-insensitive.
A function like this could be used for checking blacklisted words.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| words | `Array`  | A list of words to check. | &nbsp; |




##### Examples

```javascript
 // returns true
 sjs.V.lacks("Visiting new places is fun.", ["coconut"]);
```
```javascript
 // returns true
 sjs.V.lacks("Visiting new places is fun.", ["aces"]);
```
```javascript
 // returns true
 sjs.V.lacks("Visiting new places is fun.", ["places"]);
```
```javascript
// returns false
sjs.V.lacks('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"]);
```


##### Returns


- `boolean`  True or False



#### V.isComposedOf(input, words) 

Checks that the input text parameter contains only strings found
within the strings array.
This function doesn’t use a strong word definition the way .contains and
.lacks does.
The function is case-insensitive.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| words | `Array`  | A list of words to check. | &nbsp; |




##### Examples

```javascript
// returns true
sjs.V.isComposedOf("10184", ["1", "2", "3", "4", "5", "6" ,"7", "8", "9", "0"]);
```
```javascript
// returns true
sjs.V.isComposedOf("I am ready.", ["I", "I'm", "am", "not", "ready"]);
```


##### Returns


- `boolean`  True or False



#### V.isLength(input, n) 

Checks if the input parameter’s character count is less than or
equal to the n parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| n | `integer`  | The upper threshold | &nbsp; |




##### Examples

```javascript
// false
sjs.V.isLength("123456789", 6);
```
```javascript
// true
sjs.V.isLength("123456789", 20);
```
```javascript
// true
sjs.V.isLength("AHHHH", 25);
```
```javascript
// true
sjs.V.isLength("This could be a tweet!", 140);
```


##### Returns


- `boolean`  True or False



#### V.isOfLength(input, n) 

Checks if the input parameter’s character count is greater than or
equal to the n parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| n | `integer`  | The lower threshold | &nbsp; |




##### Examples

```javascript
// true
sjs.V.isOfLength("123456789", 6);
```
```javascript
// false
sjs.V.isOfLength("123456789", 20);
```
```javascript
// false
sjs.V.isOfLength("AHHHH", 25);
```
```javascript
// false
sjs.V.isOfLength("This could be a tweet!", 140);
```


##### Returns


- `boolean`  True or False



#### V.countWords(input) 

Counts the number of words in the input parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |




##### Examples

```javascript
// returns 1
sjs.V.countWords("Hello.");
```
```javascript
// returns 5
sjs.V.countWords("Hard-to-type-really-fast!");
```
```javascript
// returns 0
sjs.V.countWords("");
```
```javascript
// returns 1
sjs.V.countWords("supercalifragilisticexpialidocious");
```


##### Returns


- `integer`  The number of contained words



#### V.lessWordsThan(input, n) 

Checks if the input parameter has a word count less than or equal
to the n parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| n | `integer`  | The upper threshold | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.moreWordsThan(input, n) 

Checks if the input parameter has a word count greater than or equal to
the n parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | The string to analyze. | &nbsp; |
| n | `integer`  | The lower threshold | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isBetween(input, floor, ceil) 

Checks that the input parameter matches all of the following:

- input is greater than or equal to the floor parameter
- input is less than or equal to the ceil parameter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `Number` `String`  | The value to analyze. | &nbsp; |
| floor | `Number` `String`  | The lower threshold | &nbsp; |
| ceil | `Number` `String`  | The upper threshold | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isAlphanumeric(input) 

Checks that the input parameter string is only composed of the following
characters:  a—z, A—Z, or 0—9.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string` `Integer`  | The value to be analyzed. | &nbsp; |




##### Examples

```javascript
// returns false
sjs.V.isAlphanumeric("Hello.");
```
```javascript
// returns false
sjs.V.isAlphanumeric("slam poetry");
```
```javascript
// returns true
sjs.V.isAlphanumeric("");
```
```javascript
// returns false
sjs.V.isAlphanumeric("ArTᴉ$ʰARd");
```
```javascript
// returns true
sjs.V.isAlphanumeric("supercalifragilisticexpialidocious");
```


##### Returns


- `boolean`  True or False



#### V.isCreditCard(input) 

Checks if the input parameter is a credit card or bank card number.
A credit card number will be defined as four sets of four alphanumeric
characters separated by hyphens (-), or a single string of alphanumeric
characters (without hyphens).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A valid credit card number | &nbsp; |




##### Examples

```javascript
// returns true
sjs.V.isCreditCard("1234-5678-9101-1121");
```
```javascript
// returns true
sjs.V.isCreditCard("1234567891011121");
```
```javascript
// returns true
sjs.V.isCreditCard("4427A693CF324D14");
```
```javascript
// returns true
sjs.V.isCreditCard("4427-A693-CF32-4D14");
```
```javascript
// returns false
sjs.V.isCreditCard("----------------");
```
```javascript
// returns false
sjs.V.isCreditCard("testcard");
```


##### Returns


- `boolean`  True or False



#### V.isHex(input) 

Checks if the input string is a hexadecimal color, such as #3677bb.
Hexadecimal colors are strings with a length of 7 (including the #),
using the characters 0—9 and A—F. isHex should also work on shorthand
hexadecimal colors, such as #333.
The input must start with a # to be considered valid.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A valid Hexadecimal color | &nbsp; |




##### Examples

```javascript
// returns true
sjs.V.isHex("#abcdef");
```
```javascript
// returns false
sjs.V.isHex("#bcdefg");
```
```javascript
// returns true
sjs.V.isHex("#bbb");
```
```javascript
// returns true
sjs.V.isHex("#1cf");
```
```javascript
// returns true
sjs.V.isHex("#1234a6");
```
```javascript
// returns true
sjs.V.isHex("#1234a68");
```
```javascript
// returns true
sjs.V.isHex("cc4488");
```


##### Returns


- `boolean`  True or False



#### V.isRGB(input) 

Checks if the input string is an RGB color, such as rgb(200, 26, 131).
An RGB color consists of:
- Three numbers between 0 and 255
- A comma between each number
- The three numbers should be contained within “rgb(” and “)“.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A valid RGB color | &nbsp; |




##### Examples

```javascript
// returns true
sjs.V.isRGB("rgb(0,0,0)");
```
```javascript
// returns true
sjs.V.isRGB("rgb(0, 0, 0)");
```
```javascript
// returns true
sjs.V.isRGB("rgb(255, 255, 112)");
```
```javascript
// returns false
sjs.V.isRGB("rgba(0,0,0, 0)");
```
```javascript
// returns false
sjs.V.isRGB("rgb(0,300,0)");
```
```javascript
// returns false
sjs.V.isRGB("rgb(0,-14,0)");
```


##### Returns


- `boolean`  True or False



#### V.isHSL(input) 

Checks if the input string is an HSL color, such as hsl(122, 1, 1).
An HSL color consists of:
- Three numbers:
  • the first number, Hue, is between 0 and 360
  • the second and third numbers, Saturation and Lightness,
    are between 0 and 1
- A comma between each number
- The three numbers should be contained within “hsl(” and “)“.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A valid HSL color | &nbsp; |




##### Returns


- `boolean`  True or False



#### V.isColor(input) 

Checks if the input parameter is a hex, RGB, or HSL color type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A valid color (Hex, RGB, HSL) | &nbsp; |




##### Examples

```javascript
// returns true
sjs.V.isColor("#ccccff");
```
```javascript
// returns true
sjs.V.isColor("rgb(255,255,200)");
```
```javascript
// returns true
sjs.V.isColor("hsl(46,0.66,0.21)");
```
```javascript
// returns false
sjs.V.isColor("hla(255,255,255)");
```
```javascript
// returns false
sjs.V.isColor("abc345");
```
```javascript
// returns true
sjs.V.isColor("#363");
```


##### Returns


- `boolean`  True or False



#### V.isTrimmed(input) 

Checks if the input parameter has leading or trailing whitespaces or too
many spaces between words.
Leading refers to before while trailing refers to after.
This function will help validate cases where extra spaces were added
accidentally by the user.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| input | `string`  | A string to analyze | &nbsp; |




##### Examples

```javascript
// returns false
sjs.V.isTrimmed("   harmony and irony");
```
```javascript
// returns false
sjs.V.isTrimmed("harmony and irony      ");
```
```javascript
// returns false
sjs.V.isTrimmed("harmony  and  irony");
```
```javascript
// returns true
sjs.V.isTrimmed("harmony and irony");
```


##### Returns


- `boolean`  True or False



#### V.isConsecutive(string, word) 

Check if the word arg is repeated within string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| string | `string`  | The string where you want to search for | &nbsp; |
| word | `string`  | The character or word you are looking for | &nbsp; |




##### Examples

```javascript
// returns false
sjs.V.isConsecutive("apollo Cred", 'pol');
```
```javascript
// returns true
sjs.V.isConsecutive("apollo Cred", 'apoll');
```


##### Returns


- `boolean`  True if word is consecutive, False otherwise




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
