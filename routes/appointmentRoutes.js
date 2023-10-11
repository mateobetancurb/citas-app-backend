import { Router } from "express";
import {
	createAppointment,
	getAppointmentsByDate,
	getAppointmentById,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/create-appointment", authMiddleware, createAppointment);
router.get("/create-appointment", authMiddleware, getAppointmentsByDate);
router.get("/edit-appointment/:id", authMiddleware, getAppointmentById);

export default router;
