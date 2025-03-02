import nodemailer from "nodemailer";

const sendMail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Event Registration Successful 🎉",
    html: `<p>Your event registration was successful! Your token number is: <strong>${token}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
