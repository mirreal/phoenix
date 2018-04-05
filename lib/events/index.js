export function EventEmitter() {
    this.events = {}
}


EventEmitter.prototype.on = function(type, listener) {
    const events = this.events

    if (!events[type]) {
        events[type] = [listener]
    } else {
        events[type].push(listener)
    }
}

EventEmitter.prototype.off = function(type, listener) {
    const events = this.events

    if (!events[type]) return
    if (typeof listener === 'undefined') return delete events[type]

    events[type].splice(events[type].indexOf(listener), 1)
}

EventEmitter.prototype.emit = function(type, data) {
    const listeners = this.events[type]

    if (!listeners) return
    listeners.forEach(listener => listener(data))
}
