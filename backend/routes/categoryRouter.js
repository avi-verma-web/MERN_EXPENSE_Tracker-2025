const express = require("express");
const categoryController = require("../controller/categoryController");
const isAuthenticated = require("../middleWares/isAuthenticated");

const categoryRouter = express.Router();

categoryRouter.post(
	"/api/v1/categories/create",
	isAuthenticated,
	categoryController.create
);
categoryRouter.put(
	"/api/v1/categories/update/:id",
	isAuthenticated,
	categoryController.update
);
categoryRouter.delete(
	"/api/v1/categories/delete/:id",
	isAuthenticated,
	categoryController.delete
);
categoryRouter.get(
	"/api/v1/categories/lists",
	isAuthenticated,
	categoryController.lists
);

module.exports = categoryRouter;
