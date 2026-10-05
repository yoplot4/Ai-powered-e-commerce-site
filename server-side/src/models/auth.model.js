// auth model for save
import dbConnect from "../../config/dbConnect.js";
// write a function handle create user
const createUser = async (user) => {

  let connection = await dbConnect.getConnection()// begin connection
	// create a new user object with the provided user data
	const newUser = {
		firstName: user.firstName,
		middleName: user.middleName,
		lastName: user.lastName,
		email: user.email,
		password_hash: user.password,
		role: "customer",
		phone: user.phone,
		city: user.city,
		sub_city: user.sub_city,
		woreda: user.woreda,
		street_address: user.street_address,
	};
	if (
		!newUser.firstName ||
		!newUser.middleName ||
		!newUser.lastName ||
		!newUser.email ||
		!newUser.password_hash ||
		!newUser.role ||
		!newUser.phone ||
		!newUser.city ||
		!newUser.sub_city ||
		!newUser.woreda ||
		!newUser.street_address
	) {
		// return res.status(400).json({
		// 	success: false,
		// 	message: "You are not provide all the necessary information",
		// });
    return "Please provide necessary information"
	}
	try {
		await connection.beginTransaction();
		// write sql query to insert the new user into the users table
		const sql = `INSERT INTO users (firstName, middleName, lastName, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)`;
		const values = [
			newUser.firstName,
			newUser.middleName,
			newUser.lastName,
			newUser.email,
			newUser.password_hash,
			newUser.role,
		];
		// execute the sql query
		// ...
		// write console log to check if the user is created successfully
		// console.log(`User created successfully: ${newUser.id} - ${newUser.firstName} ${newUser.middleName} ${newUser.lastName}`);
		const [result] = await connection.execute(sql, values);

		const newUserId = result.insertId;

		const addressSql = ` INSERT INTO addresses (user_id, phone, city, sub_city, woreda,      street_address) values (?, ?, ?, ?, ?, ?)`;
		const addressValues = [
			newUserId,
			newUser.phone,
			newUser.city,
			newUser.sub_city,
			newUser.woreda,
			newUser.street_address,
		];

		await connection.execute(addressSql, addressValues);

		await connection.commit();



		return newUserId;
	} catch (error) {
    await connection.rollback()
		console.log(error);
    throw error;
	} finally {
		if (connection) await connection.release();
	}
};

// write a function handle get all users
const getAllUsers = async () => {
	// write sql query to get all users from the users table
	const sql = `SELECT * FROM users`;
	const [users] = await dbConnect.execute(sql);
	return users;
};

const findUserByEmail = async (email) => {
  try {
    const sql = `
    SELECT id, firstName, middleName, lastName, email, password_hash, role
    FROM users
    WHERE email = ?
  `;
	const [rows] = await dbConnect.execute(sql, [email]);
	return rows[0]; // return single user or undefined
  } catch (error) {
    console.log(error);
    throw error;
  }
	
};

export { createUser, getAllUsers, findUserByEmail };
