function object(o) {
    if (typeof Object.create === 'function') {
        return Object.create(o)
    }

    function F() {}
    F.prototype = o
    return new F()
}


export default function inherits(constructor, superConstructor) {
    const prototype = object(superConstructor.prototype)
    prototype.constructor = constructor

    constructor.prototype = prototype
}
