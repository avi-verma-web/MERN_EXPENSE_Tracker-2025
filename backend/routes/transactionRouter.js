const express = require("express");
const transactionController = require("../controller/transactionController");
const isAuthenticated = require("../middleWares/isAuthenticated");

const transactionRouter = express.Router();

transactionRouter.post(
	"/api/v1/transactions/create",
	isAuthenticated,
	transactionController.create
);
transactionRouter.get(
	"/api/v1/transactions/lists",
	isAuthenticated,
	transactionController.getFilteredTransactions
);
transactionRouter.get(
	"/api/v1/transactions/transaction/:id",
	isAuthenticated,
	transactionController.getTransactionById
);
transactionRouter.put(
	"/api/v1/transactions/update/:id",
	isAuthenticated,
	transactionController.update
);
transactionRouter.delete(
	"/api/v1/transactions/delete/:id",
	isAuthenticated,
	transactionController.delete
);

module.exports = transactionRouter;
