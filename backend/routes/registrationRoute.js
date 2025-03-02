import express from "express";
import { registerUser } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/registerUser", registerUser);

export default router;
