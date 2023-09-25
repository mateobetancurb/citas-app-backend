import dotenv from "dotenv";
import { db } from "../config/db.js";
import Services from "../models/Services.js";
import { services } from "./services.js";

dotenv.config();

await db();

async function seedDB() {
	try {
		await Services.insertMany(services);
		console.log("data was added to db");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

async function clearDB() {
	try {
		await Services.deleteMany();
		console.log("all data was deleted from db");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

if (process.argv[2] === "--import") {
	seedDB();
} else {
	clearDB();
}
