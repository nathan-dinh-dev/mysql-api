import config from "./config.js";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(config.db);

class DbService {
  static instance = null;

  static getDbServiceInstance() {
    return this.instance ? this.instance : new DbService();
  }

  // GET method
  async getAllData(tableName) {
    try {
      if (tableName === "books") {
        const [results, fields] = await connection.query(
          "SELECT * FROM `books`"
        );

        return results;
      } else if (tableName === "authors") {
        const [results, fields] = await connection.query(
          "SELECT * FROM `authors`"
        );

        return results;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // POST method
  async insertNewBook(bookID, authorID, title, genre) {
    try {
      const query =
        "INSERT INTO `books` (`BookID`, `AuthorID`, `Title`, `Genre`) VALUES (?, ?, ?, ?)";
      const [results, fields] = await connection.query(query, [
        bookID,
        authorID,
        title,
        genre,
      ]);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewAuthor(authorID, authorName, country) {
    try {
      const query =
        "INSERT INTO `authors` (`AuthorID`, `AuthorName`, `Country`) VALUES (?, ?, ?)";
      const [results, fields] = await connection.query(query, [
        authorID,
        authorName,
        country,
      ]);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  // PUT method
  async updateAuthor({ authorID, authorName, country }) {
    try {
      let query = "";
      if (authorName && country)
        query = `UPDATE authors SET AuthorName="${authorName}", Country="${country}" WHERE authorID=${authorID} LIMIT 1`;
      else if (authorName)
        query = `UPDATE authors SET AuthorName="${authorName}" WHERE authorID=${authorID} LIMIT 1`;
      else if (country)
        query = `UPDATE authors SET Country="${country}" WHERE authorID=${authorID} LIMIT 1`;

      const [results, fields] = await connection.query(query);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook({ bookID, authorID, title, genre }) {
    try {
      let query = "";
      if (bookID && authorID && title && genre)
        query = `UPDATE books SET AuthorID=${authorID}, Title="${title}", Genre="${genre}" WHERE bookID=${bookID} LIMIT 1`;
      else if (authorID && title)
        query = `UPDATE books SET AuthorID=${authorID}, Title="${title}" WHERE bookID=${bookID} LIMIT 1`;
      else if (authorID && genre)
        query = `UPDATE authors SET AuthorID=${authorID}, Genre="${genre}" WHERE bookID=${bookID} LIMIT 1`;
      else if (genre && title)
        query = `UPDATE books SET Genre="${genre}", Title="${title}" WHERE bookID=${bookID} LIMIT 1`;
      else if (authorID)
        query = `UPDATE books SET AuthorID=${authorID} WHERE bookID=${bookID} LIMIT 1`;
      else if (genre)
        query = `UPDATE books SET Genre="${genre}" WHERE bookID=${bookID} LIMIT 1`;
      else if (title)
        query = `UPDATE books SET  Title="${title}" WHERE bookID=${bookID} LIMIT 1`;

      const [results, fields] = await connection.query(query);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Method
  async deleteBook({ bookID, authorID, title, genre }) {
    try {
      let query = "";
      if (bookID) query = `DELETE FROM books WHERE BookID=${bookID} LIMIT 1`;
      else if (authorID)
        query = `DELETE FROM books WHERE AuthorID=${authorID} LIMIT 1`;
      else if (genre)
        query = `DELETE FROM books WHERE Genre="${genre}" LIMIT 1`;
      else if (title)
        query = `DELETE FROM books WHERE Title="${title}" LIMIT 1`;

      const [results, fields] = await connection.query(query);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAuthor({ authorID, authorName, country }) {
    try {
      let query = "";
      if (authorID)
        query = `DELETE FROM authors WHERE AuthorID=${authorID} LIMIT 1`;
      else if (authorName)
        query = `DELETE FROM authors WHERE AuthorName="${authorName}" LIMIT 1`;
      else if (country)
        query = `DELETE FROM authors WHERE Country="${country}" LIMIT 1`;

      const [results, fields] = await connection.query(query);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}

export default DbService;
