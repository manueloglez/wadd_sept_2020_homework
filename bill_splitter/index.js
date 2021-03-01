const path = require('path')
const express = require('express')
const logger = require('morgan')

const app = express()
console.log(path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('main', { total: 0 })
})

app.post('/', (req, res) => {
    let { amount, people, tip, tax} = req.body
    amount = parseFloat(amount)
    tax = parseFloat(tax)
    tip = parseFloat(tip)
    people = parseFloat(people)
    console.log(req.body)
    const total = (( amount + (amount*tip/100) + (amount*tax/100) ) / people).toFixed(2)
    console.log(total)
    res.render('main', {total})
})

const PORT = process.env.PORT || 3000
const ADDRESS = 'localhost' // 127.0.0.1

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`)
})