const mongoose = require("mongoose");
const { validExpenseTypes, validCategoryNames } = require("../utils/commonUtils");

const transactionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: validExpenseTypes,
		},
		category: {
			type: String,
			required: true,
			default: validCategoryNames.UNCATEGORIZED,
		},
		amount: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		description: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
