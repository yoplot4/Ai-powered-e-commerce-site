// import mysql2 to create a connection to the database
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// create a connection to the database  
const dbConnect = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",  
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

export default dbConnect;