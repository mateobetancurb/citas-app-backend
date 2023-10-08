import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

//config .env variables
dotenv.config();

//config app
const app = express();

//enable read forms from body - client
app.use(express.json());

//connect to db
db();

//cors config
const whiteList = [process.env.FRONTEND_URL, undefined];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			//allow connection
			callback(null, true);
		} else {
			//dont allow connection
			callback(new Error("CORS ERROR"));
		}
	},
};
app.use(cors(corsOptions));

//define rute
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

//define port
const PORT = process.env.PORT || 4000;

//launch or execute app
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
