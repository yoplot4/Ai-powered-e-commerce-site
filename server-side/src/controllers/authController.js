// auth controller
// import the model

import {
	createUser,
	getAllUsers,
	findUserByEmail,
} from "../models/auth.model.js";

// import bycrypt to encrypt password
import bcrypt from "bcrypt";
// import jesonwebtoken
import jwt from "jsonwebtoken";

const registerUserController = async (req, res) => {
	// handle user registration logic here

	try {
		const user = req.body;
		// check is already exist or not
		const existUser = await findUserByEmail(user.email);
		if (existUser) {
			return res.status(400).json({
				success: false,
				message:
					"Email already registered. Please login or use a different email.",
			});
		}
		// encrypt password before send to the model
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user.password, salt);
		user.password = hashedPassword;
		// call the createUser function from the model
		const newUser = await createUser(user);
		console.log(
			`Create user controller is working for user:${newUser.id} - ${newUser.firstName} - ${newUser.lastName}`,
		);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: newUser,
		});
	} catch (error) {
		console.error("Error creating a user:", error);
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}

	// res.send("user registration controller");
};

const loginUserController = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(403).json({
				success: false,
				message: "your provide information does not exist",
			});
		}

		// Get user from DB
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password_hash);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// create jwt payload
		const payload = {
			id: user.id,
			email: user.email,
			role: user.role,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "30m",
		});

		// Success: return safe user info
		res.status(200).json({
			success: true,
			message: "Login successful",
			token,
			user: {
				id: user.id,
				firstName: user.firstName,
				middleName: user.middleName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
        Token: token
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export { registerUserController, loginUserController };
