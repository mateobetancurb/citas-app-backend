import { Router } from "express";
import { createAppointment } from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/create-appointment", authMiddleware, createAppointment);

export default router;
