import { Router } from "express";
import {
	createAppointment,
	getAppointmentsByDate,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/create-appointment", authMiddleware, createAppointment);
router.get("/create-appointment", authMiddleware, getAppointmentsByDate);

export default router;
