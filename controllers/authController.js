import User from "../models/User.js";

const userRegister = async (req, res) => {
	if (Object.values(req.body).includes("")) {
		const error = new Error("Todos los campos son obligatorios");

		return res.status(400).json({
			msg: error.message,
		});
	}

	try {
		const user = new User(req.body);
		await user.save();
		res.json({
			msg: "El usuario se creó correctamente, revisa tu correo electrónico",
		});
	} catch (error) {
		console.log(error);
	}
};

export { userRegister };
