# yaps.js (Yet Another PubSub)

A small PubSub library written in JavaScript (ES6).

## Files
* yaps.js -- uses ES6
* yaps.min.js -- minified version (compatible for older versions EcmaScript)

## Pros?
1. Fairly simple and straight forward.
2. < 1Kb  size of minified file.
3. Minified version is compatible with previous versions of ES6.

## Usage

- Load minified file in html with `<script>` tag.
- Once loaded in project, `yaps` will be available globally with the following exposed interfaces.

#### Subscribe

```
let handlerIdentifier = yaps.subscribe(topic, handlerFunc);
```

Returns: unique identifier/token of handler

#### Unsubscribe

```
yaps.unsubscribe(handlerIdentifier);
```

Returns: yaps object

#### Publish

```
yaps.publish(topic, argument1, argument2, ...);
```

Returns: yaps object


##### Example Code

```

// hold all the identifers
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
subscriptions.forEach( handlerId => {
    yaps.unsubscribe(handlerId);
});

yaps.publish('exampleTopic', 'hello', 'world');
// No output as all the handlers were unsubscribed

```

##### Example Code (for node.js)

```
(function() {

    // using minified file
    this.yaps = require('./yaps.min.js').yaps;
    
    // using unminified file
    // this.yaps = require('./yaps.js').yaps;
    
    // OR add with process "process.yaps = require('./yaps.js')"
    
    let id = yaps.subscribe('exampleTopic', function(a){
        console.log(a)
    });

    yaps.publish('exampleTopic', 'this will log');

    yaps.unsubscribe(id);

    yaps.publish('exampleTopic', 'this will not log');

}());
```