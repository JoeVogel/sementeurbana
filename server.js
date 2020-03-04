require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

let app = express()
let port = 80

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, function () {
    console.log('Site Institucional está rodando na porta ' + port)
})