const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const formidable = require('formidable');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/student', async (req, res) => {
    console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "hr@homeworkhometutors.in", // generated ethereal user
          pass: "Homework@nilambur3", // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: `"${req.body.name}" <hr@homeworkhometutors.in>`, // sender address
        to: "mail.narrow@gmail.com", // list of receivers
        subject: "Student Registration", // Subject line
        text: "Student Details", // plain text body
        html: `<p><b>Name : </b>${req.body.name}</p> <p><b>Email : </b>${req.body.email}</p> <p><b>Phone : </b> ${req.body.phone}</p> <p><b>Class : </b>${req.body.classname}</p> <p><b>District : </b>${req.body.district}</p>`, // html body
      });

    res.send('Hello');
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

app.post('/teacher', async (req, res, next) => {
    //console.log(req.headers);
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        // res.json({ fields, files });
        // console.log(fields, files);
        console.log(fields.name);

        let transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "hr@homeworkhometutors.in", // generated ethereal user
              pass: "Homework@nilambur3", // generated ethereal password
            },
          });
    
          let info = await transporter.sendMail({
            from: `"${fields.name}" <hr@homeworkhometutors.in>`, // sender address
            to: "mail.narrow@gmail.com", // list of receivers
            subject: "Student Registration", // Subject line
            text: "Student Details", // plain text body
            html: `<p><b>Name : </b>${fields.name}</p> <p><b>Email : </b>${fields.email}</p> <p><b>Phone : </b> ${fields.phone}</p> <p><b>Qualification : </b>${fields.qualification}</p> <p><b>Address : </b>${fields.address}</p>`, // html body
            attachments: [
                {   
                    filename: files.file.name,
                    path: files.file.path
                },
            ]
          });

          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });


    res.send('Hello');

});

app.listen(process.env.PORT, () => console.log('Sever Started'));