import { Router } from "express";

const router = Router();

router.get("/status", (req, res) => {
	res.status(200).json({ msg: "Server is alive!" });
});

export default router;
