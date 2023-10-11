import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";
import { validateObjectId, handleNotFoundError } from "../helpers/index.js";

const createAppointment = async (req, res) => {
	const appointment = req.body;
	appointment.user = req.user._id.toString();
	try {
		const newAppointment = new Appointment(appointment);
		await newAppointment.save();
		res.json({
			msg: "¡Tu cita se agendó exitosamente!",
		});
	} catch (err) {
		console.log(err);

		const error = new Error("Error: la cita no se pudo agendar");
		return res.status(401).json({
			msg: error.message,
		});
	}
};

const getAppointmentsByDate = async (req, res) => {
	const { date } = req.query;
	const newDate = parse(date, "dd/MM/yyyy", new Date());

	if (!isValid(newDate)) {
		const error = new Error("Error: la fecha no es válida");
		return res.status(400).json({
			msg: error.message,
		});
	}

	const isoDate = formatISO(newDate);

	const appointments = await Appointment.find({
		date: {
			$gte: startOfDay(new Date(isoDate)),
			$lte: endOfDay(new Date(isoDate)),
		},
	}).select("time");

	res.json(appointments);
};

const getAppointmentById = async (req, res) => {
	const { id } = req.params;

	//validar que sea un id valido
	if (validateObjectId(id, res)) return;

	//validar que la cita exista
	const appointment = await Appointment.findById(id);
	if (!appointment) {
		return handleNotFoundError("La cita no existe", res);
	}

	//retornar la cita
	res.json({ appointment });
};

export { createAppointment, getAppointmentsByDate, getAppointmentById };
