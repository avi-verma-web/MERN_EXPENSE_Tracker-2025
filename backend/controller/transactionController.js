const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

const transactionController = {
	create: asyncHandler(async (req, res) => {
		const { type, category, amount, date, description } = req.body;
		if (!amount || !type || !date) {
			throw new Error("Type , amount and date are required");
		}
		const transaction = await Transaction.create({
			user: req.user,
			type,
			category,
			amount,
			date,
			description,
		});
		res.status(201).json(transaction);
	}),
	lists: asyncHandler(async (req, res) => {
		const transactions = await Transaction.find({ user: req.user });
		res.json(transactions);
	}),
	update: asyncHandler(async (req, res) => {}),
	delete: asyncHandler(async (req, res) => {}),
};
module.exports = transactionController;
