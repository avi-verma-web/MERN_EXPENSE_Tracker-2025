const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middleWares/errorhandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
require("dotenv").config();
const mongo_url = `mongodb+srv://imavinashverma99:${process.env.mongo_pw}@cluster0.vkhuehu.mongodb.net/mern_expense_tracker?retryWrites=true&w=majority&appName=Cluster0`;
// Connect mongodb
mongoose
	.connect(mongo_url)
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB error", err.message));

const app = express();
const PORT = process.env.PORT || 8000;
// req.body parser
app.use(express.json());
// routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
// error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
