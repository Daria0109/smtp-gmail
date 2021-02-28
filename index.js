const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dshnipova@gmail.com',
    pass: 'shnipovssamurai',
  },
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})