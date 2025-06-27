const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vectorjobsbusiness@gmail.com',  // Your email address
      pass: 'cscj tqxm mtiz pgnx',  // Your app password
    },
  });
  
  // Function to send an email
  const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: '"Vector Jobs" <vectorjobsbusiness@gmail.com>', // Sender address
      to,
      subject,
      text,
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  module.exports = sendEmail;