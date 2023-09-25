import express from "express";
import {
	createService,
	getAllServices,
	getServiceById,
	updateService,
} from "../controllers/servicesController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);

export default router;
