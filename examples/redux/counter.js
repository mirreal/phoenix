import createStore from '../../lib/redux/createStore'


function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }

    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const store = createStore(counter)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })
setTimeout(() => {
    store.dispatch({ type: 'INCREMENT' })
}, 1000)
setTimeout(() => {
    store.dispatch({ type: 'DECREMENT' })
}, 4000)
