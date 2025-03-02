import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import registerRoute from "./routes/registrationRoute.js"
import cors from 'cors'

//configure env 
dotenv.config()

console.log(process.env.MONGO_URI);
//database config
connectDB();

const app = express();
app.use(express.json());
app.use(cors());





//routes

app.use("/api/v1/register", registerRoute)

// app.post("/api/register", async (req, res) => {
//     try {
//         const newRegistration = new Registration(req.body);
//         await newRegistration.save();
//         res.json({ success: true, registrationId: newRegistration._id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Registration failed" });
//     }
// });

app.listen(5000, () => console.log("Server running on port 5000"));
