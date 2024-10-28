// React processing adapted from https://leejjon.medium.com/create-a-react-app-served-by-express-js-node-js-and-add-typescript-33705be3ceda
// Nodemailer integration adapted from https://medium.com/@Scofield_Idehen/sending-emails-made-easy-integrating-nodemailer-with-reactjs-e8d0d04a595e

'use strict';

/* 
#############
## IMPORTS ##
#############
*/

// import + init cors
const cors = require("cors");
// import + init nodemailer
const nodemailer = require("nodemailer");
// import + init express 
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());


/* 
###############
## API CALLS ##
###############
*/
// create calls for nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'sunstopverify@gmail.com',
      pass: 'dknt fdgr ppcb qxgs',
    },
  });

app.post("/api/send", (req, res) => {
    console.log("> received send email request from frontend")
    console.log(req.body);

    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error response");
            return res.status(500).send(error);
        }
        res.status(200).send("Email sent successfully");
    });
});


/* 
#################
## SERVE REACT ##
#################
*/
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
##################
*/
// init on port 8888
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});