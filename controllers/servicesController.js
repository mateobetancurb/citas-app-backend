import mongoose from "mongoose";
import { services } from "../data/services.js";
import Services from "../models/Services.js";
import { validateObjectId } from "../helpers/index.js";

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
	//validar object id
	if (validateObjectId(id, res)) return;

	//validar que el servicio existe
	const service = await Services.findById(id);
	if (!service) {
		const error = new Error("El servicio no existe");
		return res.status(404).json({ msg: error.message });
	}

	//mostrar el servicio
	res.json(service);
};

const updateService = async (req, res) => {
	const { id } = req.params;

	//validar object id
	if (validateObjectId(id, res)) return;

	//validar que el servicio existe
	const service = await Services.findById(id);
	if (!service) {
		const error = new Error("El servicio no existe");
		return res.status(404).json({ msg: error.message });
	}

	//editar el servicio
	service.name = req.body.name || service.name;
	service.price = req.body.price || service.price;

	try {
		await service.save();
		res.json({ msg: "El servicio fue editado correctamente" });
	} catch (error) {
		console.log(error);
	}
};

export { createService, getAllServices, getServiceById, updateService };
