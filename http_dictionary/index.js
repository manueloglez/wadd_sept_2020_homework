const http = require('http')
const fs = require('fs')
const queryParser = require('./queryParser')

const dictionaryPath = './Oxford+English+Dictionary.txt'

// A simple function to convert the .txt to a JS object
const dictParser = (data) => {
    const fullDict = {}
    data.split('\n').forEach(pair => {
        const [key, value] = pair.split('  ')
        fullDict[key.toLowerCase()] = value
    })
    return fullDict
}

// We need a function to read the txt
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) reject('cannot read file')
            resolve(data)
        })
    })
}

const server = http.createServer( (req, res) => {
    const [url, query] = req.url.split('?')
    res.writeHead(200, {'Content-type':'text/html'})
    // Check if the user is asking for a word
    if (query) {
        // In case he is asking for info, we read the dictionary
        readFile(dictionaryPath).then((info) => {
            // we obtain the word he is asking for
            const requestedWord = queryParser(query).word
            const dictInfo = dictParser(info)
            // check if it exist in our dictionary
            const wordFound = dictInfo[requestedWord.toLowerCase()]
            if (wordFound) {
                res.write(`
                <h1>${requestedWord}</h1>
                <p>${wordFound}</p>
                `)
                return res.end()
            // In case it doesn't exist, print the correct message
            } else {
                res.write(`
                <h1>Sorry your word was not found</h1>
                `)
                return res.end()
            }
        })
    // if he isn't asking anything, print a generic message
    } else {
        res.write(`
        <h1>Welcome to my dictionary</h1>
        `)
        return res.end()
    }
})

// Finally we assing the port and address for our server
const PORT = 5000
const ADDRESS = 'localhost'
server.listen(PORT, ADDRESS, () => {
    console.log(`Server started on http://${ADDRESS}:${PORT}`)
})