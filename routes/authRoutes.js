import { Router } from "express";
import {
	userRegister,
	verifyUserAccount,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", userRegister);
router.get("/verify/:token", verifyUserAccount);

export default router;
