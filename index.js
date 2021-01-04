const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const formidable = require('formidable');

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

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
        to: "hr@homeworkhometutors.in", // list of receivers
        subject: "Student Registration", // Subject line
        text: "Student Details", // plain text body
        html: `<p><b>Name : </b>${req.body.name}</p> <p><b>Email : </b>${req.body.email}</p> <p><b>Phone : </b> ${req.body.phone}</p> <p><b>Class : </b>${req.body.classname}</p> <p><b>District : </b>${req.body.district}</p>`, // html body
      });

    res.send('Hello');
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

app.post('/teacher', async (req, res, next) => {
    res.json(req.headers);
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        // res.json({ fields, files });
        //console.log(fields, files);
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
            from: `"${req.body.name}" <hr@homeworkhometutors.in>`, // sender address
            to: "mail.narrow@gmail.com", // list of receivers
            subject: "Student Registration", // Subject line
            text: "Student Details", // plain text body
            html: `<p><b>Name : </b>${req.body.name}</p> <p><b>Email : </b>${req.body.email}</p> <p><b>Phone : </b> ${req.body.phone}</p> <p><b>Qualification : </b>${req.body.qualification}</p> <p><b>Address : </b>${req.body.address}</p>`, // html body
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