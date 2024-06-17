import ejs from "ejs";
import { sendEmail } from "../Helpers";


import path from 'path'
import dotenv from 'dotenv'

import { DBHelper } from "../DatabaseHelpers";
dotenv.config({ path: path.resolve(__dirname, "../../.env") })

const dbInstance = new DBHelper()
export interface User {
    Id: string,
    Name: string,
    Email: string,
    Password: string,
    isDeleted: number,
    isEmailSent: number,
}

export interface Booking {
    Id: string
    UserId: string
    TourId: string
    HotelId: string
    BookingDate: string
}

export interface Tour {
    Id: string,
    Name: string,
    Destination: string,
    Description: string,
    Price: number
}
export interface Hotel {
    Id: string,
    Name: string,
    Location: string,
    StarRating: number
}
export async function run() {

    try {
        let users = (await dbInstance.query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        users.forEach(user => {
            ejs.renderFile("Templates/register.ejs", { name: user.Name }, async (error, data) => {
                let messageOption = {
                    to: user.Email,
                    from: process.env.EMAIL,
                    subject: "Welcome to Jose Tour booking System",
                    html: data
                }

                // console.log(data)
                sendEmail(messageOption)
                if (error) {
                    console.log(error)
                }
            })

            dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE Id='${user.Id}'`)
        })


    } catch (error) {
        console.log(error)
    }
}

export const sendBookingEmail = async () => {
    try {
        const bookings = (await dbInstance.exec('getBookingEmail', {})).recordset as Booking[]
        console.log(bookings)

        if (bookings.length === 0) {
            return console.log("Waiting for new Bookings");
        }

        bookings.forEach(async booking => {
            const user = (await dbInstance.exec('getUserViaId', { Id: booking.UserId })).recordset as User[]
            const hotel = (await dbInstance.exec('getHotel', { Id: booking.HotelId })).recordset as Hotel[]
            const tour = (await dbInstance.exec('getTour', { Id: booking.TourId })).recordset as Tour[]

            if (user.length === 0) {
                return console.log("User not found");
            }
            if (tour.length === 0) {
                return console.log("hotel not found");
            }
            if (hotel.length === 0) {
                return console.log("tour not found");
            }


            ejs.renderFile("Templates/Bookedmessage.ejs",
                {
                    BookingId: booking.Id,
                    Username: user[0].Name,
                    Tourname: tour[0].Name,
                    Bookingdate: booking.BookingDate

                }, (err, data) => {
                    let messageOption = {
                        to: user[0].Email,
                        from: process.env.EMAIL,
                        subject: "New Tour Booked",
                        html: data
                    }
                    console.log("Booking email");

                    console.log(data)
                    sendEmail(messageOption)
                })

            dbInstance.query(`UPDATE Bookings SET isEmailSent=1 WHERE Id='${booking.Id}'`)


        });


    } catch (error: any) {
        return console.log(error);

    }

}