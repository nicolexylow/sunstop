// React processing adapted from https://leejjon.medium.com/create-a-react-app-served-by-express-js-node-js-and-add-typescript-33705be3ceda
// Nodemailer integration adapted from https://medium.com/@Scofield_Idehen/sending-emails-made-easy-integrating-nodemailer-with-reactjs-e8d0d04a595e
// Twiolio integration adapted from https://www.twilio.com/en-us/blog/send-an-sms-react-twilio
// Passwordless auth adapted from https://medium.com/@ogubuikealex/how-to-implement-passwordless-authentication-in-node-js-with-nodemailer-and-gmail-4e6ee338a897

'use strict';

/* 
#############
## IMPORTS ##
############# */

/* EXPRESS BACKEND STUFF */
const express = require('express');
const cors = require("cors");
const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

/* NPM MODULES */
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

let testVar=false;


// Grab local ip address, since probably going to be running this on local network
// Genius idea from https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js#comment120137862_8440736
let localIP=[].concat(...Object.values(require('os').networkInterfaces())).find(x => !x.internal && x.family === 'IPv4')?.address;

/* 
##################
## JSONWEBTOKEN ##
################## */

/* VARIABLES */
// Generate unique token for our verif propcess
const generateToken = (contact) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(new Date().getMinutes() + 45);
  return jwt.sign({ contact, expirationDate }, process.env.JWT_SECRET_KEY);
};


/* 
##################
## NODEMAILER ##
################## */

/* VARIABLES */
// Grab our email template
// Not too useful yet
const emailHtml = (email) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--$-->
<html dir="ltr" lang="en"><a href="${email}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:0px 0px 0px 0px" target="_blank"><span><!--[if mso]><i style="mso-font-width:NaN%;mso-text-raise:0" hidden></i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:0">Click me</span><span><!--[if mso]><i style="mso-font-width:NaN%" hidden>&#8203;</i><![endif]--></span></a>

</html>
`}
console.log(emailHtml);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'sunstopverify@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});
/* API CALL */
app.post("/api/send", (req, res) => {
  console.log("> received the following send email request from frontend:")
  console.log(req.body);

  // Prepare claim handshake
  const token = generateToken(req.body.to);
  const link = `${localIP}:8888/api/verify?token=${token}`;

  // Email variables
  const mailOptions = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      html: emailHtml(link),
  };

  // Beam me down Scotty!
  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          console.log("error response");
          return res.status(500).send(error);
      }
      res.status(200).send("Email sent successfully");
  });
});


/* 
############
## TWILIO ##
############ */

/* VARIABLES */
const client = require('twilio')(process.env.SMS_SID, process.env.SMS_PASS);

// API call
app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: req.body.body
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }));
  })
  .catch(err => {
    console.log(err);
    res.send(JSON.stringify({ success: false }));
  });
});


/* 
#################
## VERIFY LINK ##
################# */

/* API CALLS */
app.get("/api/verify", (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(401).send("Invalid user token");
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    res.status(401).send("Invalid authentication credentials");
    return;
  }

  if (
    !decodedToken.hasOwnProperty("contact") ||
    !decodedToken.hasOwnProperty("expirationDate")
  ) {
    res.status(401).send("Invalid authentication credentials.");
    return;
  }

  const { expirationDate } = decodedToken;
  if (expirationDate < new Date()) {
    res.status(401).send("Token has expired.");
    return;
  }  
  res.status(200).send("verfication successful");
  testVar = true;
  console.log(testVar)
});


app.get("/api/handle/verify", (req, res) => {
  console.log(testVar)
  if ( testVar == true) {
    res.status(200).send("verfication successful");
  } else {
    res.status(401).send("unsuccessful");
  }
});



/* 
#################
## SERVE REACT ##
################# */

const path = require('path');
// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    }
});
app.use(express.static(path.join(__dirname, '../dist')));

/* 
##################
## START SERVER ##
################## */

// init on port 8888
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});