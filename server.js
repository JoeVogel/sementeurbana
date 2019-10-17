require('dotenv').config()

const express = require('express')
const nodemailer = require('nodemailer')
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

app.post('/api/contact', function (req, res) {

    let transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASS
        }
    })

    let mailOptions = {
        to: 'contato@sementeurbana.com',
        subject: 'Novo contato no SITE SU - ' + req.body.name,
        body: 'Um novo contato foi feito via site! \n\nDados do contato.\n\nNome: ' + req.body.name + '\nE-mail: ' + req.body.mail
    }

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.log(error)
            res.status(500).send('Error sending e-mail')
        }

        console.log('Message %s sent: %s', info.messageId, info.response)
        res.status(200).send('Success')

    })

})



app.listen(port, function () {
    console.log('Site Institucional está rodando na porta ' + port)
})