//  this is middleware
import jwt from "jsonwebtoken";

// Middleware for registration (just validation, no JWT check)
const registerUserMiddleware = (req, res, next) => {
	console.log("auth middleware is working correctly");
	next();
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader)
		return res.status(403).json({
			success: false,
			message: "No token provided",
		});
	
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({
				success: false,
				message: "Invalid or expired token",
			});
		req.user = user; // attach payload
		next();
	});
};

// Middleware to authorize based on user roles
const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				success: false,
				message: "Access denied - insufficient permissions",
			});
		}
		next();
	};
};

export { registerUserMiddleware, verifyToken, authorizeRoles };
