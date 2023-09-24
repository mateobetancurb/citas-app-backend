import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";

//config .env variables
dotenv.config();

//config app
const app = express();

//enable read forms from body - client
app.use(express.json());

//connect to db
db();

//define rute
app.use("/api/services", servicesRoutes);

//define port
const PORT = process.env.PORT || 4000;

//launch or execute app
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
