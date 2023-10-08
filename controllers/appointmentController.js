import Appointment from "../models/Appointment.js";

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

export { createAppointment };
