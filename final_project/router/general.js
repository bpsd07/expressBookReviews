const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let public_users = express.Router();

// TASK 1: GET ALL BOOKS
public_users.get('/', (req, res) => {
  res.send(JSON.stringify(books, null, 2));
});

// TASK 2: GET BY ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// TASK 3: GET BY AUTHOR
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = [];
  Object.keys(books).forEach(isbn => {
    if (books[isbn].author === author) {
      result.push(books[isbn]);
    }
  });
  res.send(result);
});

// TASK 4: GET BY TITLE
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = [];
  Object.keys(books).forEach(isbn => {
    if (books[isbn].title === title) {
      result.push(books[isbn]);
    }
  });
  res.send(result);
});

// TASK 5: GET REVIEWS
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// TASK 10: ASYNC GET ALL BOOKS
public_users.get('/async/books', async (req, res) => {
  const response = await axios.get("http://localhost:5000/");
  res.send(response.data);
});

// TASK 11: ASYNC ISBN
public_users.get('/async/isbn/:isbn', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
  res.send(response.data);
});

// TASK 12: ASYNC AUTHOR
public_users.get('/async/author/:author', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
  res.send(response.data);
});

// TASK 13: ASYNC TITLE
public_users.get('/async/title/:title', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
  res.send(response.data);
});

module.exports.general = public_users;
