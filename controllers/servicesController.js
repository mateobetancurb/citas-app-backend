import mongoose from "mongoose";
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

const getAllServices = (req, res) => {
	res.json(services);
};

const getServiceById = async (req, res) => {
	const { id } = req.params;
	//validar un object id

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("El id no es válido");
		return res.status(400).json({ msg: error.message });
	}

	//validar que el servicio existe
	const service = await Services.findById(id);
	if (!service) {
		const error = new Error("El servicio no existe");
		return res.status(404).json({ msg: error.message });
	}

	//mostrar el servicio
	res.json(service);
};

export { createService, getAllServices, getServiceById };
