const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/commonUtils");
const User = require("../model/User");

const userController = {
	register: asyncHandler(async (req, res) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			throw new Error("All Fields are required");
		}
		const userExits = await User.findOne({ email });
		if (userExits) {
			throw new Error("User already exists");
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const userCreated = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res.json({
			username: userCreated.username,
			email: userCreated.email,
			id: userCreated._id,
		});
	}),
	login: asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("Invalid login credentials");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error("Invalid login credentials");
		}
		const token = jwt.sign({ id: user._id }, jwtSecretKey, {
			expiresIn: "30d",
		});
		res.json({
			message: "Login Success",
			id: user._id,
			token,
			email: user.email,
			username: user.username,
		});
	}),
	profile: asyncHandler(async (req, res) => {
		const user = await User.findById(req?.user);
		if (!user) {
			throw new Error("User not found");
		}
		res.json({
			username: user.username,
			email: user.email,
		});
	}),
	changeUserPassword: asyncHandler(async (req, res) => {
		const { newPassword } = req.body;
		const user = await User.findById(req?.user);
		if (!user) {
			throw new Error("User not found");
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashedPassword;
		await user.save();
		res.json({
			message: "Password updated successfully",
		});
	}),
	updateUserProfile: asyncHandler(async (req, res) => {
		const { email, username } = req.body;
		const updatedUser = await User.findByIdAndUpdate(
			req.user,
			{
				username,
				email,
			},
			{
				new: true,
			}
		);
		res.json({
			message: "User profile updated successfully",
			updatedUser,
		});
	}),
};
module.exports = userController;
