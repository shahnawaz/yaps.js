"use strict";
// Yet Another PubSub (implementation with ES6)

(function(root) {

	// if already loaded, return the old object
	if (root && root.yaps) {
		return root.yaps;
	}

	// Hold topics
	let topics = {};

	// Unique identifier for each subscriber
	let subscriberIdentifier = -1;

	// Subscribe to topic/event with a callback function
	const subscribe = (topic, func) => {

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
	const unsubscribe = (token) => {

		for(let topic in topics) {
			if(topics.hasOwnProperty(topic)) {
				topics[topic].forEach((subscriber, index) => {
					if(subscriber.token === token) {
						topics[topic].splice(index, 1);
					}
				})
			}
		}

		return root.yaps;

	};

	// Publish or broadcast topic/event with the desired arguments
	const publish = (topic, ...rest) => {

		if(!topics[topic]) {
			return false;
		}
		
		let subscribers = topics[topic];

		subscribers.forEach(subscriber => {
			subscriber.func(...rest)
		});

		return root.yaps;

	};

	// To reveal only the public interfaces
	let yaps = {
		publish,
		subscribe,
		unsubscribe
	};

	if (root) {
		root.yaps = yaps;
	}

	return yaps;

}((typeof window === 'object' && window) || this));