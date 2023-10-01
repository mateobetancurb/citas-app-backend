import { Router } from "express";
import { userRegister } from "../controllers/authController.js";

const router = Router();

router.post("/register", userRegister);

export default router;
