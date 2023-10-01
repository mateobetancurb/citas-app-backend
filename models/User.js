import mongoose from "mongoose";
import { generateId } from "../helpers";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	token: {
		type: String,
		default: () => generateId,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
