const asyncHandler = require("express-async-handler");
const { validExpenseTypes } = require("../utils/commonUtils");
const Category = require("../model/Category");

const categoryController = {
	create: asyncHandler(async (req, res) => {
		const { name, type } = req.body;
		if (!name || !type) {
			throw new Error("Name and type are required for creating a category");
		}
		if (!validExpenseTypes.includes(type.toLowerCase())) {
			throw new Error(`Invalid category type ${type}`);
		}
		const normalizedName = name.toLowerCase();
		const categoryExists = await Category.findOne({
			name: normalizedName,
			user: req.user,
		});
		if (categoryExists) {
			throw new Error(
				`Category ${categoryExists.name} already exists in database`
			);
		}
		const category = await Category.create({
			name: normalizedName,
			user: req.user,
			type,
		});
		res.status(201).json(category);
	}),
	lists: asyncHandler(async (req, res) => {
		const categories = await Category.find({ user: req.user });
		res.status(200).json(categories);
	}),
	update: asyncHandler(async (req, res) => {}),
	delete: asyncHandler(async (req, res) => {}),
};
module.exports = categoryController;
