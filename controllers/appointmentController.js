import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";
import {
	validateObjectId,
	handleNotFoundError,
	formatDate,
	formatTime,
} from "../helpers/index.js";
import {
	sendEmailNewAppointment,
	sendEmailUpdateAppointment,
	sendEmailDeleteAppointment,
} from "../emails/appointmentEmailService.js";

const createAppointment = async (req, res) => {
	const appointment = req.body;
	appointment.user = req.user._id.toString();
	try {
		const newAppointment = new Appointment(appointment);
		const result = await newAppointment.save();
		res.json({
			msg: "¡Tu cita se agendó exitosamente!",
		});
		await sendEmailNewAppointment({
			date: formatDate(result.date),
			time: formatTime(result.time),
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
	const appointment = await Appointment.findById(id).populate("services");

	if (!appointment) {
		return handleNotFoundError("La cita no existe", res);
	}

	//validar que la cita pertenezca al usuario logueado
	if (appointment.user.toString() !== req.user._id.toString()) {
		const error = new Error("Permiso denegado");
		return res.status(403).json({ msg: error.message });
	}
	//retornar la cita
	res.json({ appointment });
};

const updateAppointment = async (req, res) => {
	const { id } = req.params;

	//validar que sea un id valido
	if (validateObjectId(id, res)) return;

	//validar que la cita exista
	const appointment = await Appointment.findById(id).populate("services");

	if (!appointment) {
		return handleNotFoundError("La cita no existe", res);
	}

	//validar que la cita pertenezca al usuario logueado
	if (appointment.user.toString() !== req.user._id.toString()) {
		const error = new Error("Permiso denegado");
		return res.status(403).json({ msg: error.message });
	}

	const { date, time, totalAmount, services } = req.body;
	appointment.date = date;
	appointment.time = time;
	appointment.totalAmount = totalAmount;
	appointment.services = services;

	try {
		const result = await appointment.save();
		res.json({ msg: "Cita editada correctamente" });
		await sendEmailUpdateAppointment({
			date: formatDate(result.date),
			time: formatTime(result.time),
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteAppointment = async (req, res) => {
	const { id } = req.params;

	//validar que sea un id valido
	if (validateObjectId(id, res)) return;

	//validar que la cita exista
	const appointment = await Appointment.findById(id).populate("services");

	if (!appointment) {
		return handleNotFoundError("La cita no existe", res);
	}

	//validar que la cita pertenezca al usuario logueado
	if (appointment.user.toString() !== req.user._id.toString()) {
		const error = new Error("Permiso denegado");
		return res.status(403).json({ msg: error.message });
	}

	try {
		const result = await appointment.deleteOne();
		res.json({ msg: "La cita fue cancelada" });
		sendEmailDeleteAppointment({
			date: formatDate(result.date),
			time: formatTime(result.time),
		});
	} catch (error) {
		console.log(error);
	}
};

export {
	createAppointment,
	getAppointmentsByDate,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
};
