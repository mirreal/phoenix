export default function createStore(reducer, preloadedState) {
    // 当前状态
    let currentState = preloadedState
    // 当前监听列表
    let currentListeners = []
    // 下一个监听列表
    let nextListeners = currentListeners
    // 是否正在分发 action
    let isDispatching = false

    // 复制 nextListeners 来保证可以直接对其进行修改
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    // 获取状态函数
    function getState() {
        if (isDispatching) {
            throw new Error('You may not call store.getState() while the reducer is executing.')
        }

        return currentState
    }

    // 订阅函数
    function subscribe(listener) {
        if (isDispatching) {
            throw new Error('You may not call store.subscribe() while the reducer is executing.')
        }

        // 是否已经订阅
        let isSubscribed = true

        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        // 返回一个取消订阅函数
        return function unsubscribe() {
            if (!isSubscribed) {
                return
            }

            if (isDispatching) {
                throw new Error('You may not unsubscribe while the reducer is executing.')
            }

            isSubscribed = false

            ensureCanMutateNextListeners()
            // 从监听函数列表删除 listener
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
        }
    }

    // 分发函数
    function dispatch(action) {
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }

        try {
            isDispatching = true
            currentState = reducer(currentState, action)
        } finally {
            isDispatching = false
        }

        const listeners = (currentListeners = nextListeners)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }

        return action
    }

    // 初始化状态
    dispatch({ type: 'INIT' })

    return {
        dispatch,
        subscribe,
        getState
    }
}
