import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

const getNotes = async () => {
  const [rows] = await pool.query("SELECT * from notes");
  return rows;
};
