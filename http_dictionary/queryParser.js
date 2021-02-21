module.exports = function(query) {
    const parsedQuery = {}
    query.split('&').forEach(pair => {
        const [key, value] = pair.split('=')
        parsedQuery[key] = value.replace('+', ' ')
    })
    return parsedQuery
}