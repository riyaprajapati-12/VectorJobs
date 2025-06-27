const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(20); // Increase the limit to 20

// Export or use the eventEmitter
module.exports = eventEmitter;