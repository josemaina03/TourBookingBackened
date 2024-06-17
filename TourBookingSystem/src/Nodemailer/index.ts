import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Step 1: Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 60000, // 60 seconds
});

// Define the types for the parameters
type EmailParams = {
  email: string;
  name: string;
};

type BookingEmailParams = {
  email: string;
  tourName: string;
  hotelName: string;
};

// Function to send registration email
export async function sendRegistrationEmail(email: string, name: string): Promise<void> {
  try {
    const emailTemplatePath = path.resolve(__dirname, '../../Templates/register.ejs');
    const renderedHtml = await ejs.renderFile(emailTemplatePath, { name });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Jose Tour booking system',
      html: renderedHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending registration email:', error.message);
    } else {
      console.error('Error sending registration email:', error);
    }
  }
}

// Function to send booking confirmation email
export async function sendBookingConfirmationEmail(email: string, tourName: string, hotelName: string): Promise<void> {
  try {
    const emailTemplatePath = path.resolve(__dirname, '../../Templates/bookedmessage.ejs');
    const renderedHtml = await ejs.renderFile(emailTemplatePath, { tourName, hotelName });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Booking Confirmation',
      html: renderedHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending booking confirmation email:', error.message);
    } else {
      console.error('Error sending booking confirmation email:', error);
    }
  }
}
