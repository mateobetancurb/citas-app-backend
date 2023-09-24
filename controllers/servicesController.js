import { services } from "../data/services.js";
import Services from "../models/Services.js";

const createService = async (req, res) => {
	if (Object.values(req.body).includes("")) {
		const error = new Error("Todos los campos son obligatorios");
		return res.status(400).json({ msg: error.message });
	}

	try {
		const service = new Services(req.body);
		await service.save();
		res.json({
			msg: "El servicio se creó correctamente",
		});
	} catch (error) {
		console.log(error);
	}
};

const getServices = (req, res) => {
	res.json(services);
};

export { createService, getServices };
