import { createTransport } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
	const transporter = createTransport(
		process.env.MAILTRAP_HOST,
		process.env.MAILTRAP_PORT,
		process.env.MAILTRAP_USER,
		process.env.MAILTRAP_PASSWORD
	);

	//enviar email
	const info = await transporter.sendMail({
		from: "Barbería Susa <clientes@barberiasusa.com>",
		to: email,
		subject: "Barbería Susa - Confirma tu cuenta",
		text: "Barbería Susa - Confirma tu cuenta",
		html: `
      <p>Hola ${name}, confirma tu cuenta en Barbería Susa</p>
      <p>Tu cuenta está casi lista, sólo debes confirmarla en el siguiente link</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
      <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
	});

	console.log("message was sent", info.messageId);
}

export async function sendEmailPasswordReset({ name, email, token }) {
	const transporter = createTransport(
		process.env.MAILTRAP_HOST,
		process.env.MAILTRAP_PORT,
		process.env.MAILTRAP_USER,
		process.env.MAILTRAP_PASSWORD
	);

	//enviar email
	const info = await transporter.sendMail({
		from: "Barbería Susa <clientes@barberiasusa.com>",
		to: email,
		subject: "Barbería Susa - Restablece tu contraseña",
		text: "Barbería Susa - Restablece tu contraseña",
		html: `
      <p>Hola ${name}, dale clic al siguiente link para restablecer tu contraseña</p>
      <a href="${process.env.FRONTEND_URL}/auth/olvide-contrasena/${token}">Cambiar contraseña</a>
      <p>Si tú no solicitaste cambiar la contraseña puedes ignorar este mensaje</p>
    `,
	});

	console.log("message was sent", info.messageId);
}
