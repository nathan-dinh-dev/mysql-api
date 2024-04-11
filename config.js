// Configuration of database connection
import "dotenv/config";

const config = {
  db: {
    host: process.env.DATABASE_HOSTNAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_CONNECTIONNAME,
  },
  listPerPage: 10,
};

export default config;
