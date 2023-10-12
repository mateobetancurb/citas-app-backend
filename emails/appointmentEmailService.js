import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({ date, time }) {
	const transporter = createTransport(
		process.env.MAILTRAP_HOST,
		process.env.MAILTRAP_PORT,
		process.env.MAILTRAP_USER,
		process.env.MAILTRAP_PASSWORD
	);

	//enviar email
	const info = await transporter.sendMail({
		from: "Citas App <citas@appsalon.com>",
		to: "admin@appsalon.com",
		subject: "Citas App - Nueva cita agendada",
		text: "Citas App - Nueva cita",
		html: `
      <p>Hola admin, tienes una nueva cita</p>
      <p>La cita será el ${date} a las ${time}</p>
    `,
	});

	console.log("message was sent", info.messageId);
}
