const styleLoader = function(source) {
    const style = `
        const styleElement = document.createElement('style')
        styleElement.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(styleElement)
    `
    return style
}

module.exports = styleLoader
