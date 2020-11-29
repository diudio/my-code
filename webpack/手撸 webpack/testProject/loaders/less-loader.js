const less = require('less')
const lessLoader = function(source) {
    let res
    less.render(source, (err, content) => {
        res = content.css.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
    })
    return res
}

module.exports = lessLoader
