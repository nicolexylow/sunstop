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

// User is only verified once they've clicked the verif link, setting this var to true
let isUserVerified=false;


// Grab local ip address, since probably going to be running this on local network
// Genius idea from https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js#comment120137862_8440736
//let localIP=[].concat(...Object.values(require('os').networkInterfaces())).find(x => !x.internal && x.family === 'IPv4')?.address;
//console.log(localIP);

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
  console.log(email);
  return `
  Click the following link to verify your email:  ${email}`}
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
  console.log(token);
  const link = `${process.env.WEB_LINK}/api/verify?token=${token}`;
  console.log(emailHtml(link));

  // Email variables
  const mailOptions = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: emailHtml(link),
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
  isUserVerified = true;
  console.log(isUserVerified)
});

app.get("/api/handle/verify", (req, res) => {
  console.log(isUserVerified);
  if ( isUserVerified == true) {
    // Reset verif check and send confirmation of verif to frontend
    isUserVerified = false;
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