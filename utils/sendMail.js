import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, text) => {
  // user details
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
  });
  console.log("Message sent: %s", info.messageId);
};
