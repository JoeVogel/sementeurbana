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
        service: 'Godaddy',
        host: 'smtp.office365.com',
        port: 587,
        secureConnection: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASS
        }
    })

    let mailOptions = {
        from: 'no_reply@sementeurbana.com',
        to: 'contato@sementeurbana.com',
        subject: 'Novo contato no SITE SU - ' + req.body.name,
        html: '<body><h5>Um novo contato foi feito via site!<h5> <p><strong>Dados do contato:</strong></p><p>Nome: ' + req.body.name + '<br>E-mail: ' + req.body.mail + '</p></body>'
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