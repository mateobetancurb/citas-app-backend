import express from "express";
import {
	createService,
	getAllServices,
	getServiceById,
} from "../controllers/servicesController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);

export default router;
