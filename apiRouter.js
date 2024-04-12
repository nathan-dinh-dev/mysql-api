import express from "express";
import "dotenv/config";
import DbService from "./dbService.js";

const router = express.Router();

// Create new row in database
router.post("/insert/book", (req, res) => {
  const { bookID, authorID, title, genre } = req.body;
  const db = new DbService();
  const result = db.insertNewBook(bookID, authorID, title, genre);

  result
    .then((data) => res.json({ message: "ok", data: data }))
    .catch((err) => console.log(err));
});

router.post("/insert/author", (req, res) => {
  const { authorID, authorName, country } = req.body;
  const db = new DbService();
  const result = db.insertNewAuthor(authorID, authorName, country);

  result
    .then((data) => res.json({ message: "ok", data: data }))
    .catch((err) => console.log(err));
});

// Retrieve data from database
router.get("/get", (req, res) => {});

router.get("/get/books/all", (req, res) => {
  const db = new DbService();

  const result = db.getAllData("books");

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.get("/get/authors/all", (req, res) => {
  const db = new DbService();

  const result = db.getAllData("authors");

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update database
router.put("/update/author", (req, res) => {
  const db = new DbService();

  const result = db.updateAuthor(req.body);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err.message));
});

router.put("/update/book", (req, res) => {
  const db = new DbService();

  const result = db.updateBook(req.body);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err.message));
});

// Delete database
router.delete("/delete/book", (req, res) => {
  const db = new DbService();

  const result = db.deleteBook(req.body);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err.message));
});

router.delete("/delete/author", (req, res) => {
  const db = new DbService();

  const result = db.deleteAuthor(req.body);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err.message));
});

export default router;
