import mongoose from "mongoose";

function validateObjectId(id, res) {
	//validar un object id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("El id no es válido");
		return res.status(400).json({ msg: error.message });
	}
}

export { validateObjectId };
