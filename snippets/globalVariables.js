(function() {
    const iframe = document.createElement('iframe')
    iframe.onload = function() {
        const iframeKeys = Object.keys(iframe.contentWindow)
        const currentKesy = Object.keys(window)

        const results = currentKesy
            .filter(key => !iframeKeys.includes(key))

        console.log(results)
    }

    iframe.src = 'about:blank'
    document.body.appendChild(iframe)
})()
