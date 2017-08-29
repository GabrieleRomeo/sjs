'use strict';

import { types as TYPES } from './types';
import ULYU from './utilities';
import ULYF from './functional';

/**
 * The Extras namespace.
 * This namespace contains a set of extras functions
 * @namespace E
 */
const E = {};

const { isArray, indexOf } = ULYU;
const { not } = ULYF;

/**
 * An Event Emitter which emits events
 * @memberof E
 */
E.EventEmitter = class EventEmitter {
  constructor() {
    this.events = {};
  }
  /**
   * The on method allows us to associate a listener to a particular event.
   * Every time the Event Emitter emits the intended event, each associated
   * listener will be called accordingly
   *
   * @param      {String}  event     The event's name
   * @param      {Function}  listener  The listener you wish to attach to the event
   */
  on(event, listener) {
    if (not(isArray(this.events[TYPES.str(event)]))) {
      this.events[event] = [];
    }
    this.events[event].push(TYPES.fun(listener));
  }
  /**
   * Removes a listener.
   *
   * @param      {String}  event     The event's name
   * @param      {Function}  listener  The listener you wish to remove from the event
   */
  removeListener(event, listener) {
    if (isArray(this.events[TYPES.str(event)])) {
      let idx = indexOf(this.events[event], TYPES.fun(listener));

      if ( idx > -1 ) {
        this.events[event].splice( idx, 1 );
      }
    }
  }
  /**
   * The event you wish to emit
   *
   * @param      {String}  event   The event's name
   */
  emit(event) {
    const args = [].slice.call( arguments, 1 );

    if (isArray(this.events[TYPES.str(event)])) {
      let listeners = this.events[event].slice();
      let length    = listeners.length;

      for (let i = 0; i < length; i++) {
        listeners[i].apply( this, args );
      }
    }
  }
  /**
   * The once method allows us to emit a particular event just once.
   *
   * @param      {String}  event     The event's name
   * @param      {Function}  listener  The listener you wish to attach to the event
   */
  once(event, listener) {
    this.on(event, function g() {
      this.removeListener(event, g);
      TYPES.fun(listener).apply(this, arguments);
    });
  }
};

/**
 * A Queue object which emits events during its lifetime
 * @memberof E
 * @fires E.Queue#enqueue
 * @fires E.Queue#dequeue
 * @fires E.Queue#empty
 */
E.Queue = class Queue extends E.EventEmitter {
  constructor() {
    super();
    this.arr  = [];
  }

  /**
   * Add an item at the end of the queue.
   * It emits the `enqueue` event
   * @fires E.Queue#enqueue
   * @param      {Value}  item    The item to be added into the Queue
   */
  enqueue(item) {
    this.arr.push(item);
    /**
     * Enqueue event
     * @event E.Queue#enqueue
     * @return {Value} The item that has been enqueued into the Queue
     */
    this.emit('enqueue', item);
  }

  /**
   * Remove the item at the head of the queue and emits the `dequeue` event.
   * If the removed item is the last one into the Queue, it also emits the `empty`
   *  event.
   * @fires E.Queue#dequeue
   * @fires E.Queue#empty
   * @return     {Value}  The first item of the Queue
   */
  dequeue() {
    const item = this.arr.shift();
    /**
     * Dequeue event
     * @event E.Queue#dequeue
     * @return {Value} The item that has been dequeued from the Queue
     */
    this.emit('dequeue', item);
    if (this.isEmpty()) {
      /**
       * Empty event - Reports that the Queue is empty
       * @event E.Queue#empty
       */
      this.emit('empty');
    }
    return item;
  }

  /**
   * Determines if empty.
   *
   * @return     {boolean}  True if empty, False otherwise.
   */
  isEmpty() {
    return this.arr.length === 0;
  }
};

/**
 * A Stack object which emits events during its lifetime
 * @memberof E
 * @fires E.Stack#push
 * @fires E.Stack#pop
 * @fires E.Stack#empty
 */
E.Stack = class Stack extends E.EventEmitter {
  constructor() {
    super();
    this.arr  = [];
  }

  /**
   * Add an item onto the Stack and emits the `push` event
   * @fires E.Stack#push
   * @param      {Value}  item    The item to be added onto the Stack
   */
  push(item) {
    this.arr.push(item);
    /**
     * Push event
     * @event E.Stack#push
     * @return {Value} The item that has been pushed onto the Stack
     */
    this.emit('push', item);
  }

  /**
   * Remove the last item of the Stack and emits the `pop` event.
   * If the removed item is the last one into the Stack, it also emits the `empty`
   *  event.
   * @fires E.Stack#pop
   * @fires E.Stack#empty
   * @return     {Value}  The last item of the Stack
   */
  pop() {
    const item = this.arr.pop();
    /**
     * Pop event
     * @event E.Stack#pop
     * @return {Value} The item that has been popped from the head of the Stack
     */
    this.emit('pop', item);
    if (this.isEmpty()) {
      /**
       * Empty event - Reports that the Stack is empty
       * @event E.Stack#empty
       */
      this.emit('empty');
    }
    return item;
  }

  /**
   * Determines if empty.
   *
   * @return     {boolean}  True if empty, False otherwise.
   */
  isEmpty() {
    return this.arr.length === 0;
  }
};

/**
 * A convenient way to handle Ajax Requests
 * @memberof E
 * @param      {(String)}  url     The url
 * @return     {(Object|Promise)}   An object containing the allowed CRUD
 *                                  operations. Each operation returns a Promise
 *                                  which can be used to follow up with its status
 */
E.$http = (url) => {
  url = TYPES.str(url);
  const core = {
    ajax: (method, url, args) => {
      method = TYPES.str(method);
      args = TYPES.obj(args);
      const promise = new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        let uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          let argcount = 0;
          for (let key of args) {
            if (argcount++) {
              uri += '&';
            }
            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      return promise;
    }
  };

  return {
    'get': args => core.ajax('GET', url, args),
    'post': args => core.ajax('POST', url, args),
    'put': args => core.ajax('PUT', url, args),
    'delete': args => core.ajax('DELETE', url, args)
  };
};


// export public functions
export default { ...E };