const asyncHandler = require("express-async-handler");
const {
	validExpenseTypes,
	validCategoryNames,
} = require("../utils/commonUtils");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

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
	update: asyncHandler(async (req, res) => {
		const categoryId = req.params.id;
		const { type, name } = req.body;
		const normalizedName = name.toLowerCase();
		const category = await Category.findById(categoryId);
		if (!category && category?.user?.toString() !== req?.user?.toString()) {
			throw new Error("Category not found or user not authorized");
		}
		const oldCategoryName = category.name;
		Object.assign(category, { type, name });
		const updatedCategory = await category.save();
		// Updated transactions with updated category names
		if (oldCategoryName !== updatedCategory.name) {
			await Transaction.updateMany(
				{
					user: req.user,
					category: oldCategoryName,
				},
				{ $set: { category: updatedCategory.name } }
			);
			res.json(updatedCategory);
		}
	}),
	delete: asyncHandler(async (req, res) => {
		const categoryId = req.params.id;
		const category = await Category.findById(categoryId);
		if (category && category?.user?.toString() === req?.user?.toString()) {
			const defaultCategory = validCategoryNames.UNCATEGORIZED;
			await Transaction.updateMany(
				{ user: req.user, category: category.name },
				{ $set: { category: defaultCategory } }
			);
			await Category.findByIdAndDelete(categoryId);
			res.json({ message: "Category deleted" });
		}
		throw new Error("Category not found or user not authorized");
	}),
};
module.exports = categoryController;
