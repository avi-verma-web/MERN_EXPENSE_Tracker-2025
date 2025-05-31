const jwtSecretKey = "mysecretkey";
const validExpenseTypes = ["income", "expense"];
const validCategoryNames = {
	ALL: "All",
	UNCATEGORIZED: "Uncategorized",
};

module.exports = { jwtSecretKey, validExpenseTypes, validCategoryNames };
