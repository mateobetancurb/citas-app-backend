import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateId } from "../helpers/index.js";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
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
		lowercase: true,
	},
	token: {
		type: String,
		default: () => generateId(),
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

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
