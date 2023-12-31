import Services from "../models/Services.js";
import { validateObjectId, handleNotFoundError } from "../helpers/index.js";

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

const getAllServices = async (req, res) => {
	try {
		const allServices = await Services.find();
		res.json(allServices);
	} catch (error) {
		console.log(error);
	}
};

const getServiceById = async (req, res) => {
	const { id } = req.params;
	//validar object id
	if (validateObjectId(id, res)) return;

	//validar que el servicio existe
	const service = await Services.findById(id);
	if (!service) {
		return handleNotFoundError("El servicio no existe", res);
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
		return handleNotFoundError("El servicio no existe", res);
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

const deleteService = async (req, res) => {
	const { id } = req.params;

	//validar object id
	if (validateObjectId(id, res)) return;

	//validar que el servicio existe
	const service = await Services.findById(id);
	if (!service) {
		return handleNotFoundError("El servicio no existe", res);
	}

	try {
		await service.deleteOne();
		res.json({ msg: "Servicio eliminado" });
	} catch (error) {
		console.log(error);
	}
};

export {
	createService,
	getAllServices,
	getServiceById,
	updateService,
	deleteService,
};
