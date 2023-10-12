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

export async function sendEmailUpdateAppointment({ date, time }) {
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
		subject: "Citas App - Cita modificada",
		text: "Citas App - Cita modificada",
		html: `
      <p>Hola admin, una de tus próximas citas ha sido modificada por el usuario</p>
      <p>La nueva cita será el ${date} a las ${time}</p>
      <strong>Ingresa al panel de administrador para ver más información sobre este cambio</strong>
    `,
	});

	console.log("message was sent", info.messageId);
}

export async function sendEmailDeleteAppointment({ date, time }) {
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
		subject: "Citas App - Cita cancelada",
		text: "Citas App - Cita cancelada",
		html: `
      <p>Hola admin, una de tus próximas citas ha sido cancelada por el usuario</p>
      <p>La cita estaba programada para el ${date} a las ${time}</p>
      <strong>Ingresa al panel de administrador para ver más información sobre este cambio</strong>
    `,
	});

	console.log("message was sent", info.messageId);
}
