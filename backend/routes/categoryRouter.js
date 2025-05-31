const express = require("express");
const categoryController = require("../controller/categoryController");
const isAuthenticated = require("../middleWares/isAuthenticated");

const categoryRouter = express.Router();

categoryRouter.post(
	"/api/v1/categories/create",
	isAuthenticated,
	categoryController.create
);
categoryRouter.get(
	"/api/v1/categories/lists",
	isAuthenticated,
	categoryController.lists
);

module.exports = categoryRouter;
