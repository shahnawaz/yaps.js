# yaps.js (Yet Another PubSub)

![version](https://img.shields.io/npm/v/yaps.js.svg?style=flat-square)
![minified size](https://img.shields.io/github/size/shahnawaz/yaps.js/yaps.min.js.svg?label=minified&style=flat-square)
![dependencies](https://img.shields.io/david/shahnawaz/yaps.js.svg?style=flat-square)
![licence](https://img.shields.io/npm/l/yaps.js.svg?style=flat-square)

> A lightweight and small PubSub library written in JavaScript (ES6)!

## Quick and Easy

- via npm: `npm i yaps.js -s`

- (or) use minified file directly from cdn: https://cdn.jsdelivr.net/npm/yaps.js/yaps.min.js

    (Note: if using minified file in a browser, `yaps` will be available globally)

## Pros?

1. Fairly simple and straight forward.
2. < 1Kb  size of minified file.
3. Minified version is compatible with previous versions of ES6.
4. Dependency free.

## Interfaces

#### Subscribe

```javascript
let handlerIdentifier = yaps.subscribe(topic, handlerFunc);
```

Returns: unique identifier/token of handler

#### Unsubscribe

```javascript
yaps.unsubscribe(handlerIdentifier);
```

Returns: yaps object

#### Publish

```javascript
yaps.publish(topic, argument1, argument2, ...);
```

Returns: yaps object


## Examples

##### import or require
```javascript
import yaps from 'yaps.js';

// OR CommonJS (node)
const yaps = require('yaps.js');
```

##### Basic example (works for all)

```javascript
// index.js

// require if working with node
const yaps = require('yaps.js');

// import if using ES6 modules (say in React)
// import yaps from 'yaps.js'

let taskModule = require('./tasks');

/* create a subscriber to get notified when there is a new task*/
let id = yaps.subscribe('taskAdded', function() {
    console.log('Updated Tasks: ', taskModule.getTasks());
});

taskModule.addTask("Don't forget to star yaps.js!");    

/* unsubscribe */
yaps.unsubscribe(id);

taskModule.addTask("With the winds we go");
```

```javascript
// tasks.js

// require if working with node
const yaps = require('yaps.js');

// import if using ES6 modules (say in React)
// import yaps from 'yaps.js'

let tasks = [];

function addTask(task) {
    tasks.push(task);

    /* notify any subscriber subscribed to this topic */
    yaps.publish('taskAdded', task);

}

function getTasks() {
    return tasks;
}

module.exports = {
    addTask,
    getTasks
};
```


##### Tip (for handling multiple subscribers)

```javascript

// hold all the identifiers
let subscriptions = [];

// subscribe to topic 'exampleTopic'

subscriptions.push(yaps.subscribe('exampleTopic', mySubscriptionHandler1));
subscriptions.push(yaps.subscribe('exampleTopic', mySubscriptionHandler2));

function mySubscriptionHandler1(arg1, arg2) {
    console.log(arg1, arg2);
}

function mySubscriptionHandler2(arg1) {
    console.log(arg1);
}

// broadcast topic

yaps.publish('exampleTopic', 'hello', 'world');
// Output: 
// hello world
// hello

yaps.publish('exampleTopic', ['hello', 'world']);
// Output: 
// ['hello', 'world'] undefined
// ['hello']

// unsubscribe all handlers
subscriptions.forEach(handlerId => {
    yaps.unsubscribe(handlerId);
});

yaps.publish('exampleTopic', 'hello', 'world');
// No output as all the handlers were unsubscribed

```

## Changelog

https://github.com/shahnawaz/yaps.js/releases

## Willing to Contribute?

Contribution guidelines will be added soon, feel free to send a PR.

## License

[MIT](https://github.com/shahnawaz/yaps.js/blob/master/LICENSE)