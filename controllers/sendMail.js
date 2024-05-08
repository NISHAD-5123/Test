const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = expressAsyncHandler(async (req,res)=>{
  const {email,message} = req.body;
  console.log(email,message);
});
//   var mailOption = {
//     from : process.env.SMTP_EMAIL,
//     to: email,
//     message: message,
//   };

//   transporter.sendMail(mailOption, function(error,info){
//     if(error){
//       console.log(error);
//     }
//     else{
//       console.log("email send successfully!!!");
//     }
//   })
// })


// let transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false, 
//   auth: {
//     user:process.env.SMTP_EMAIL,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// const sendMail = async(req,res)=>{
//     let testAccount = await nodemailer.createTestAccount();

// //  transporter part here

//       let info = await transporter.sendMail({
//         from: "arun@gmail.com",
//         to: "raj@gmail.com", // list of receivers
//         subject: "Interview question making", // Subject line
//         text: "Hello Raj?", // plain text body
//         html: "<b>Hello Raj?</b>", // html body
//       });
//     console.log("message sent : %s", info.messageId);
//     res.json(info);
// };
module.exports = {sendEmail};
