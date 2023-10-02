import User from "../models/User.js";
import { sendEmailVerification } from "../emails/authEmailService.js";

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

	//validar longitud contraseña
	const MIN_PASSWORD_LENGTH = 8;
	if (password.trim().length < MIN_PASSWORD_LENGTH) {
		const error = new Error("La contraseña debe tener más de 7 caracteres");

		return res.status(400).json({
			msg: error.message,
		});
	}

	try {
		const user = new User(req.body);
		const savedUser = await user.save();

		const { name, email, token } = savedUser;

		sendEmailVerification({
			name,
			email,
			token,
		});

		res.json({
			msg: "El usuario se creó correctamente, revisa tu correo electrónico",
		});
	} catch (error) {
		console.log(error);
	}
};

export { userRegister };
