import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})
import ejs from 'ejs'


///Step 1 create a configuration object

let config= {
 host: "smtp.gmail.com",
 service:"gmail",
 port:587,
 auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
 }
}

///step 2 is create a transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

//before ejs
// let messageOptions = {
//   to: process.env.EMAIL_ADDRESS,
//   from: process.env.EMAIL_ADRESS,
//   subject: "Products",
//   html: "<h1>Hello there</h1>",
// };
//step 3 send Email

export async function sendEmail(messageOption:any){
    let transporter= createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err,info)=>{
        if(err){
            console.log(err);
            
        }

        console.log(info);
        
    })
}



