const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");
const { validCategoryNames } = require("../utils/commonUtils");

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
	getFilteredTransactions: asyncHandler(async (req, res) => {
		const { startDate, endDate, type, category } = req.query;
		const filters = { user: req.user };
		if (startDate) {
			Object.assign(filters, { date: { $gte: new Date(startDate) } });
		}
		if (endDate) {
			Object.assign(filters, { date: { $lte: new Date(endDate) } });
		}
		if (type) {
			Object.assign(filters, { type });
		}
		if (category) {
			if (category === validCategoryNames.ALL) {
			} else {
				Object.assign(filters, { category });
			}
		}
		const transactions = await Transaction.find(filters).sort({ date: -1 });
		res.json(transactions);
	}),
	update: asyncHandler(async (req, res) => {
		const { type, category, amount, date, description } = req.body;
		const transaction = await Transaction.findById(req.params.id);
		if (transaction && transaction.user.toString() === req.user.toString()) {
			transaction.type = type || transaction.type;
			transaction.category = category || transaction.category;
			transaction.amount = amount || transaction.amount;
			transaction.date = date || transaction.date;
			transaction.description = description || transaction.description;
			const updatedTransaction = await transaction.save();
			res.json(updatedTransaction);
		}
		res.json({ message: "Nothing is updated!" });
	}),
	delete: asyncHandler(async (req, res) => {
		const transaction = await Transaction.findById(req.params.id);
		if (transaction && transaction.user.toString() === req.user.toString()) {
			await Transaction.findByIdAndDelete(req.params.id);
			res.json({ message: "Transaction is removed" });
		}
		res.json({ message: "Nothing is deleted!" });
	}),
};
module.exports = transactionController;
