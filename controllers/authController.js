import User from "../models/User.js";
import { sendEmailVerification } from "../emails/authEmailService.js";
import { generateJWT, generateId } from "../helpers/index.js";

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
	const MIN_PASSWORD_LENGTH = 1;
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

const verifyUserAccount = async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({ token });

	if (!user) {
		const error = new Error("Error: el token no es válido");

		return res.status(401).json({
			msg: error.message,
		});
	}

	//si el token es valido, confirmar la cuenta
	try {
		user.verified = true;
		user.token = "";
		await user.save();
		res.json({ msg: "Usuario confirmado correctamente" });
	} catch (error) {
		console.log(error);
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;

	//validar si el usuario existe
	const user = await User.findOne({ email });

	if (!user) {
		const error = new Error("Error: datos de acceso inválidos");

		return res.status(401).json({
			msg: error.message,
		});
	}

	//validar si verificó el correo
	if (!user.verified) {
		const error = new Error(
			"Para poder ingresar debes confirmar tu correo electrónico"
		);

		return res.status(401).json({
			msg: error.message,
		});
	}

	//validar contraseña
	if (await user.checkPassword(password)) {
		const token = generateJWT(user._id);
		return res.json({ token });
	} else {
		const error = new Error("Error: datos de acceso inválidos");

		return res.status(401).json({
			msg: error.message,
		});
	}
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		const error = new Error("Error: correo inválido");
		return res.status(404).json({
			msg: error.message,
		});
	}

	try {
		user.token = generateId();
		await user.save();

		res.json({
			msg: "Te acabamos de enviar un correo electrónico con las instrucciones",
		});
	} catch (error) {
		console.log(error);
	}
};

const user = async (req, res) => {
	const { user } = req;
	res.json({ user });
};

export { userRegister, verifyUserAccount, userLogin, forgotPassword, user };
