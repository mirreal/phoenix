import isPlainObject from '../../utils/isPlainObject'


console.log(isPlainObject([1, 2, 3])) // false

console.log(isPlainObject(Object.create(null))) // true

function Foo() {
    this.a = 1
}
console.log(isPlainObject(new Foo)) // false

console.log(isPlainObject({ 'x': 0, 'y': 0 })) // true
