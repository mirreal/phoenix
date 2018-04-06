import Promise from '../../lib/promise/'


const promise1 = new Promise(function(resolve, reject) {
    // setTimeout(resolve, 2000, 'foo');

    setTimeout(function() {
        resolve('数据1')
    }, 2000)
})

promise1.then(data => {
    console.log(data)
})
