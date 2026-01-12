const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

let users = [];
let authenticated = express.Router();

// TASK 6: REGISTER
authenticated.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password missing" });
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// TASK 7: LOGIN
authenticated.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  let token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: "1h" });
  req.session.authorization = { accessToken: token };

  return res.status(200).json({ message: "Login successful" });
});

// TASK 8: ADD / MODIFY REVIEW
authenticated.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added/updated" });
});

// TASK 9: DELETE REVIEW
authenticated.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted" });
  }

  return res.status(404).json({ message: "Review not found" });
});

module.exports.authenticated = authenticated;
