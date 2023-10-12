import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import { format } from "date-fns";
import es from "date-fns/locale/es/index.js";

function validateObjectId(id, res) {
	//validar un object id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("El id no es válido");
		return res.status(400).json({ msg: error.message });
	}
}

function handleNotFoundError(message, res) {
	const error = new Error(message);
	return res.status(404).json({ msg: error.message });
}

function generateId() {
	return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

function generateJWT(id) {
	const token = JWT.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	return token;
}

function formatDate(date) {
	return format(date, "PPPP", { locale: es });
}

function formatTime(time) {
	return format(new Date(`1970-01-01T${time}`), "h:mm a", { locale: es });
}

export {
	validateObjectId,
	handleNotFoundError,
	generateId,
	generateJWT,
	formatDate,
	formatTime,
};
