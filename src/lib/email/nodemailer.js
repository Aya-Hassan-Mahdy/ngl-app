import nodemailer from "nodemailer";
import {env} from "../config/env.js"

 const transporter = nodemailer.createTransport({
    
  service: 'gmail',
  auth: {
    user: env.nodemailer.user,
    pass: env.nodemailer.password
  }
   })
   
   export async function sendEmail(to , subject , html) {

   await transporter.sendMail({
    from: `"ngl-app" <${process.env.MAIL_USER}>`, 
    to: to,
    subject: subject,
    html: html
})
}