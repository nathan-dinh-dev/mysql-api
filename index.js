import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./apiRouter.js";

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://mysql-api-wb0w.onrender.com",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// API routes
app.use("/", router);

app.get("/testAPI", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log("Listening on Port", PORT);
});
