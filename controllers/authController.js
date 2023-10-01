import User from "../models/User.js";

const userRegister = async (req, res) => {
	//validar todos los campos
	if (Object.values(req.body).includes("")) {
		const error = new Error("Todos los campos son obligatorios");

		return res.status(400).json({
			msg: error.message,
		});
	}

	const { name, email, password } = req.body;
	//evitar registros duplicados
	const userExists = await User.findOne({ email });
	if (userExists) {
		const error = new Error("Este usuario ya existe");

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
