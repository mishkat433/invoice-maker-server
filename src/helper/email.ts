import nodemailer from "nodemailer";
import config from "../config";
import ApiError from "../error/ApiError";
import httpStatus from "http-status";
import { IEmailDataType } from "../interface/globalInstance";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD
    }
});

export const sendEmailWithNodeMailer = async (emailData: IEmailDataType) => {

    try {
        const mailOptions = {
            from: config.SMTP_USERNAME,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html
        }
        await transporter.sendMail(mailOptions)
    }
    catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, "email could not be sent");
    }
}

