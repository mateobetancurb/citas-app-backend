import { Router } from "express";
import {
	userRegister,
	verifyUserAccount,
	userLogin,
	user,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userRegister);
router.get("/verify/:token", verifyUserAccount);
router.post("/login", userLogin);

// rutas protegidas
router.get("/user", authMiddleware, user);

export default router;
