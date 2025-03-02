import Registration from "../models/Registration.js";
import sendMail from "../config/nodemailer.js";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  
  try {
    const { name, email, class: userClass, event, type, participants } = req.body;

    // Check if the user has already registered
    const existingUser = await Registration.findOne({ email, event });
    if (existingUser) {
      return res.status(400).json({ message: "You have already registered for this event." });
    }

    const token = generateToken();

    const newRegistration = new Registration({
      name,
      email,
      class: userClass,
      event,
      type,
      participants,
      token,
    });

    await newRegistration.save();
    await sendMail(email, token);

    res.status(201).json({ message: "Registration Successfully Done!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
