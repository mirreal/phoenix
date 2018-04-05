export function EventEmitter() {
    this.events = {}
}

EventEmitter.prototype.on = function(type, listener, once = false) {
    if (this.events[type] === undefined) {
        this.events[type] = {
            once: once,
            actions: []
        }
    }

    this.events[type].actions.push(listener)
}

EventEmitter.prototype.once = function(key, fn) {
    this.on(key, fn, true)
}

EventEmitter.prototype.off = function(type, listener) {
    const events = this.events

    if (!events[type]) return
    if (typeof listener === 'undefined') return delete events[type]

    events[type].splice(events[type].indexOf(listener), 1)
}

EventEmitter.prototype.emit = function(type, data) {
    const event = this.events[type]

    if (!event) return

    const once = event.once
    const actions = event.actions

    actions.forEach(listener => listener(data))
    once && this.off(type)
}
