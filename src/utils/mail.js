import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://task-managerlink.com",
        }
    })

   const emailTextual = mailGenerator.generatePlaintext(options.mailGenerator);

   const emailHtml = mailGenerator.generate(options.mailGenerator);

   const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
    }
   })


const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml
}

try {
    await transporter.sendMail(mail)
} catch (error) {
    console.error("Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file")
    console.error("Error:, error")
}

}


const emailVerificationMailGenContent = (username, verificationUrl) =>{
    return {
        body: {
            name: username,
            intro: "Welcome to our application! We're excited to have you on board.",
            action: {
                instructions: "To verify your email address, please click the button below:",
                button: {
                    color: "#22BC66",
                    text: "Verify Email",
                    link: verificationUrl
                },
            },
            outro: "Need help or have questions? Just reply to this email, we'd love to help."
        }
    }
}


const forgotPasswordMailGenContent = (username, passwordResetUrl) =>{
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password.",
            action: {
                instructions: "To reset your password, please click the button below:",
                button: {
                    color: "#9f94ba",
                    text: "Reset Password",
                    link: passwordResetUrl
                },
            },
            outro: "Need help or have questions? Just reply to this email, we'd love to help."
        },
    };
};

export {
    emailVerificationMailGenContent,
    forgotPasswordMailGenContent,
    sendEmail,
};