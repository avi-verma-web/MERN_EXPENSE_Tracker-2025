const mongoose = require("mongoose");
const {
	validExpenseTypes,
	validCategoryNames,
} = require("../utils/commonUtils");

const categorySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
			default: validCategoryNames.UNCATEGORIZED,
		},
		type: {
			type: String,
			required: true,
			enum: validExpenseTypes,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
