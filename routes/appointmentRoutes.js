import { Router } from "express";
import {
	createAppointment,
	getAppointmentsByDate,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/create-appointment", authMiddleware, createAppointment);
router.get("/create-appointment", authMiddleware, getAppointmentsByDate);
router.get("/edit-appointment/:id", authMiddleware, getAppointmentById);
router.put("/edit-appointment/:id", authMiddleware, updateAppointment);
router.delete("/delete-appointment/:id", authMiddleware, deleteAppointment);

export default router;
