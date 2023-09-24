import mongoose from "mongoose";
export const db = async () => {
	try {
		const db = await mongoose.connect(process.env.DATABASE_URI);
		const url = `${db.connection.host}: ${db.connection.port}`;
		console.log(`db connected: ${url}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};
