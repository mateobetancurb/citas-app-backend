import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getUserAppointments } from "../controllers/usersController.js";

const router = Router();

router.get("/:user/appointments", authMiddleware, getUserAppointments);

export default router;
