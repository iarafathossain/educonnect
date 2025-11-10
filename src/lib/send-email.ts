import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  emailInfo: { to: string; subject: string; message: string }[]
) => {
  if (!Array.isArray(emailInfo) || emailInfo.length === 0) {
    throw new Error("Invalid email information");
  }

  try {
    const response = await Promise.allSettled(
      emailInfo.map(async (data) => {
        const { to, subject, message } = data;
        if (to && subject && message) {
          const sentInfo = await resend.emails.send({
            to,
            from: "noreply@educonnect.com",
            subject,
            react: EmailTemplate({ message }),
          });
          return sentInfo;
        } else {
          new Promise((reject) => {
            return reject(
              new Error(
                `Could not send email please check ${JSON.stringify(data)}`
              )
            );
          });
        }
      })
    );
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
