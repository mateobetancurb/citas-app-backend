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
		from: "Citas App",
		to: email,
		subject: "Confirma tu cuenta",
		text: "Confirma tu cuenta",
		html: `
      <p>Hola ${name}, confirma tu cuenta en CitasApp</p>
      <p>Tu cuenta está casi lista, sólo debes confirmarla en el siguiente link</p>
      <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
      <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
	});

	console.log("message was sent", info.messageId);
}
