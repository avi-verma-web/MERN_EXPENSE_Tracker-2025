const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/commonUtils");

const isAuthenticated = async (req, res, next) => {
	const headerObj = req.headers;
	// {authorization: 'Bearer tokenasdasdasdasd'}
	const token = headerObj?.authorization?.split(" ")[1];
	const verifyToken = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    // returned values are assigned to verifyToken
		if (err) {
			return false;
		} else {
			return decoded;
		}
	});  
	if (verifyToken) {
		req.user = verifyToken.id;
		next();
	} else {
		const err = new Error("Token expired, Please Login again");
		next(err);
	}
};
module.exports = isAuthenticated;
