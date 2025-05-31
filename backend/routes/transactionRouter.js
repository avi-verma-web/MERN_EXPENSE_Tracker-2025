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
	transactionController.lists
);

module.exports = transactionRouter;
