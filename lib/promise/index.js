import EventEmitter from '../events/'
import inherits from '../inherits/'

function Promise(factory) {
    EventEmitter.call(this)

    factory && factory(res => {
        this.emit('fulfilled', res)
    },
    err => {
        this.emit('rejected', err)
    })
}

inherits(Promise, EventEmitter)

Promise.prototype.then = function(resolve, reject) {
    if (typeof resolve === 'function') {
        this.once('fulfilled', resolve)
    }
    if (typeof reject === 'function') {
        this.once('rejected', reject)
    }

    return this
}
