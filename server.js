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
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
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

    // host: "smtpout.secureserver.net",
    // port: 587,

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