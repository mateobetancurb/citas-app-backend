import { Router } from "express";
import {
	userRegister,
	verifyUserAccount,
	userLogin,
	user,
	forgotPassword,
	verifyPasswordResetToken,
	updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userRegister);
router.get("/verify/:token", verifyUserAccount);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", verifyPasswordResetToken);
router.post("/forgot-password/:token", updatePassword);

// rutas protegidas
router.get("/user", authMiddleware, user);

export default router;
