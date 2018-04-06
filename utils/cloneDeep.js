export default function cloneDeep(value) {
    const keys = Object.keys(value)

    return keys.reduce((acc, key) => {
        if (typeof value[key] === 'object') {
            acc[key] = cloneDeep(value[key])
        } else {
            acc[key] = value[key]
        }

        return acc
    }, {})
}
