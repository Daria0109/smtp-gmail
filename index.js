const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN || '-'
const smtp_password = process.env.SMTP_PASSWORD || '-'

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtp_login,
    pass: smtp_password,
  },
});

app.get('/', (req, res) => {
  res.send('I am working!' )
})

app.post('/sendMessage', async (req, res) => {
  const {name, email, subject, message} = req.body
  await transporter.sendMail({
    from: 'My portfolio website',
    to: "dshnipova@gmail.com",
    subject: 'Message from my portfolio website',
    html: `<div style="font-size: 16px"><b>Subject:</b> ${subject}</div>
<div><b>Name:</b> ${name}</div>
<div><b>Email:</b> ${email}</div>
<div><b>Message:</b> ${message}</div>`,
  });
  res.send(req.body)
})

const port = process.env.PORT || 3010

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})