// promise 串行执行


var rainbowColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'bule',
    'indigo',
    'violet'
]

var getColor = color =>
    new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(`[${new Date()}]: get ${color}`)
        // }, 1000)
        var random = Math.floor(Math.random() * 3) + 1
        setTimeout(resolve, 1000 * random, `[${new Date()}]: get ${color}, time cost: ${random}m`)
    })

var handleResponse = res => {
    console.log(res)
    console.log(`[${new Date()}]`)
}


// 错误做法，并不能按顺序依次执行
// 因为 `forEach` 是同步的
rainbowColors.forEach(color => {
    getColor(color)
        .then(res => {
            handleResponse(res)
        })
})

// 正确做法
var sequence = Promise.resolve()
rainbowColors.forEach(color => {
    sequence = sequence
        .then(() => getColor(color))
        .then(res => {
            handleResponse(res)
        })
})

// 或者使用 reduce
rainbowColors.reduce((sequence, color) => {
    return sequence
        .then(() => getColor(color))
        .then(res => {
            handleResponse(res)
        })
}, Promise.resolve())

// 提前执行，顺序打印
rainbowColors.map(getColor)
    .reduce((sequence, colorPromise) => {
        return sequence
            .then(() => colorPromise)
            .then(res => {
                handleResponse(res)
            })
    }, Promise.resolve())


// 使用 generator
function spawn(generatorFunc) {
    function continuer(verb, arg) {
        var result
        try {
            result = generator[verb](arg)
        } catch (err) {
            return Promise.reject(err)
        }
        if (result.done) {
            return result.value
        } else {
            return Promise.resolve(result.value).then(onFulfilled, onRejected)
        }
    }
    var generator = generatorFunc()
    var onFulfilled = continuer.bind(continuer, 'next')
    var onRejected = continuer.bind(continuer, 'throw')
    return onFulfilled()
}

// 串行执行
spawn(function* () {
    try {
        for (const color of rainbowColors) {
            const res = yield getColor(color)
            handleResponse(res)
        }
    } catch (err) {
        console.log(err)
    }
})

// 顺序处理 promise
spawn(function* () {
    try {
        const colorPromises = rainbowColors.map(getColor)

        for (const colorPromise of colorPromises) {
            const res = yield colorPromise
            handleResponse(res)
        }
    } catch (err) {
        console.log(err)
    }
})


// async/await
// 串行执行
async function run() {
    try {
        for (const color of rainbowColors) {
            const res = await getColor(color)
            handleResponse(res)
        }
    } catch (err) {
        console.log(err)
    }
}
run()

// 顺序处理 promise
;(async function() {
    try {
        const colorPromises = rainbowColors.map(getColor)

        for (const colorPromise of colorPromises) {
            const res = await colorPromise
            handleResponse(res)
        }
    } catch (err) {
        console.log(err)
    }
})()
