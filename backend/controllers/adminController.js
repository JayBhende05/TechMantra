import Admin from "../models/Admin.js";
import Registration from "../models/Registration.js";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  
  if (username === "admin" && password === "password123") {
    res.json({ message: "Login successful", token: "admin-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getRegistrations = async (req, res) => {
  const registrations = await Registration.find();
  res.json(registrations);
};
