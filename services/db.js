import config from "../config.js";
import mysql from "mysql2/promise";

try {
  const connection = await mysql.createConnection(config.db);

  const [results, fields] = await connection.query("SELECT * FROM `books`");

  console.log(results);
  console.log(fields);
} catch (error) {
  console.log(error);
}
