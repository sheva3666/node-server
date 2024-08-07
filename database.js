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

export const getNotes = async () => {
  const [rows] = await pool.query("SELECT * from notes");
  return rows;
};

export const getNote = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM notes
    where id = ?`,
    [id]
  );
  return rows[0];
};

export const createNote = async (title, contents) => {
  const result = await pool.query(
    `
    INSERT INTO notes (title, contents)
    VALUES (?, ?)`,
    [title, contents]
  );

  const id = result[0].insertId;
  return getNote(id);
};
