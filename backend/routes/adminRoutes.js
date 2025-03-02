import express from "express";
import { adminLogin, getRegistrations } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/registrations", getRegistrations);

export default router;
