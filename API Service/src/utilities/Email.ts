import { createTransport, Transporter } from "nodemailer";

export interface EmailSpec {
  body: string;
  recipients: string[];
  sender: string;
  subject: string;
}

export interface EmailTransporter {
  transporter: Transporter;
}

export const createTransporter = (): EmailTransporter => {
  const transporter = createTransport({
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    host: process.env.EMAIL_HOST,
    port: 587,
  });
  
  return { transporter };
};

export const sendMail = async (
  emailTransporter: EmailTransporter,
  emailSpec: EmailSpec
) => {
  const { body, recipients, sender, subject } = emailSpec;

  return new Promise((resolve, reject) => {
    emailTransporter.transporter.sendMail(
      {
        from: sender,
        html: body,
        subject: subject,
        to: recipients,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};
