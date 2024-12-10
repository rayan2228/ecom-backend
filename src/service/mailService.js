import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "rayan.cit.bd@gmail.com",
        pass: "njos bbvj yxjm ybxp",
    },
});

export async function sendMail(to, subject, text = "", html = "") {
    try {
        const info = await transporter.sendMail({
            from: 'mern2308  <rayan.cit.bd@gmail.com>',
            to,
            subject,
            text,
            html
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}


