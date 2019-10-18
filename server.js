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

let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    port: 465,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_PASS
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/api/contact', function (req, res) {

    let mailOptions = {
        from: 'no_reply@sementeurbana.com',
        to: 'contato@sementeurbana.com',
        subject: 'Semente Urbana - Novo contato no SITE - ' + req.body.name,
        html: '<body><h5>Um novo contato foi feito via site!<h5> <p><strong>Dados do contato:</strong></p><p>Nome: ' + req.body.name + '<br>Telefone: ' + req.body.phone + '<br>E-mail: ' + req.body.email + '</p></body>'
    }

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.log(error)
            res.status(500).send('Error sending e-mail')
            return
        }

        console.log('Message %s sent: %s', info.messageId, info.response)
        res.status(200).send('Success')

    })

})

app.listen(port, function () {
    console.log('Site Institucional está rodando na porta ' + port)
})