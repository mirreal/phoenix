import cloneDeep from '../../utils/cloneDeep'


const a = {
    name: 'Patrick',
    school: {
        subject: 'math',
        score: 89
    },
    colors: ['red', 'blue', 'orange']
}
const b = cloneDeep(a)
console.log('a:')
console.log(a)
console.log('b:')
console.log(b)
console.log(a === b) // false
