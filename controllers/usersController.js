import Appointment from "../models/Appointment.js";

const getUserAppointments = async (req, res) => {
	const { user } = req.params;
	const userRole = "user";

	if (user !== req.user._id.toString() && userRole !== "admin") {
		const error = new Error("Acceso denegado");
		return res.status(400).json({ msg: error.message });
	}
	try {
		const appointments = await Appointment.find({
			user,
			date: {
				$gte: new Date(),
			},
		})
			.populate("services")
			.sort({ date: "asc" });
		res.json(appointments);
	} catch (error) {
		console.log(error);
	}
};

export { getUserAppointments };
