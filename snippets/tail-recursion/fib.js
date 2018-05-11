// 普通递归实现的裴波那契数列，性能非常低
function fib(n) {
    if (n < 2) return 1

    return fib(n - 1) + fib(n - 2)
}

console.time()
fib(42)
console.timeEnd()

// 使用尾递归实现
function fibTail(n, a = 1, b = 1) {
    if (n === 0) return a

    return fibTail(n - 1, b, a + b)
}

console.time()
fibTail(42)
console.timeEnd()
