import dotenv from "dotenv";
import { db } from "../config/db.js";
import Services from "../models/Services.js";
import { services } from "./services.js";

dotenv.config();

await db();

async function seedDB() {
	try {
		await Services.insertMany(services);
		console.log("se agregaron los datos");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

function clearDB() {
	console.log("desde clear");
}

if (process.argv[2] === "--import") {
	seedDB();
} else {
	clearDB();
}
