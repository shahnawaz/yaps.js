// Yet Another PubSub (implementation with ES6)

(function(root, factory) {

    let yaps = {};

    let define = root.define;

    factory(yaps);

    if (typeof define === 'function' && define.amd){
    	// AMD. Register as an anonymous module
        define(function() { return yaps; });
    } else if (typeof exports === 'object'){
    	// CommonJS
        if (module !== undefined && module.exports) {
        	// Node support
            exports = module.exports = yaps;
        } else {
        	// Old CommonJS support
            exports.yaps = yaps;
            module.exports = exports = yaps;
        }
    }

}((typeof window === 'object' && window) || this, (yaps) => {

    // Hold topics
    let topics = {};

    // Unique identifier for each subscriber
    let subscriberIdentifier = -1;

    // Subscribe to topic/event with a callback function
    yaps.subscribe = (topic, func) => {

        if(!topics[topic]) {
            topics[topic] = [];
        }

        let token = (++subscriberIdentifier).toString();
        topics[topic].push({
            func,
            token
        });

        return token;

    };

    // Unsubscribe to topic/event by providing the token returned from PubSub.subscribe(topic)
    yaps.unsubscribe = (token) => {

        for(let topic in topics) {
            if(topics.hasOwnProperty(topic)) {
                topics[topic].forEach((subscriber, index) => {
                    if(subscriber.token === token) {
                        topics[topic].splice(index, 1);
                    }
                })
            }
        }

        return yaps;

    };

    // Publish or broadcast topic/event with the desired arguments
    yaps.publish = (topic, ...rest) => {

        if(!topics[topic]) {
            return false;
        }

        let subscribers = topics[topic];

        subscribers.forEach(subscriber => {
            subscriber.func(...rest)
        });

        return yaps;

    };

    yaps.topics = topics;

}));
