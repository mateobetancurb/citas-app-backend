import { Router } from "express";
import {
	userRegister,
	verifyUserAccount,
	userLogin,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", userRegister);
router.get("/verify/:token", verifyUserAccount);
router.post("/login", userLogin);

export default router;
