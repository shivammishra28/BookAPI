// controllers/pageController.js
const axios = require('axios');

const API = process.env.API_URL || 'http://localhost:5000/api';

exports.signupPageHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await axios.post(`${API}/signup`, { username, email, password });
    res.render('login', { message: 'Signup successful! Please log in.' });
  } catch (err) {
    const error = err.response?.data?.error || err.message;
    res.render('signup', { message: `Signup failed: ${error}` });
  }
};

exports.loginPageHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data } = await axios.post(`${API}/login`, { email, password });
    // store token in session (requires express-session) or pass to next pages
    req.session = { token: data.token };
    res.redirect('/books');
  } catch (err) {
    const error = err.response?.data?.error || err.message;
    res.render('login', { message: `Login failed: ${error}` });
  }
};

exports.listBooks = async (req, res) => {
  try {
    const { data } = await axios.get(`${API}/books`);
    res.render('books', { books: data.books || data });
  } catch (err) {
    res.render('books', { books: [], message: 'Couldn’t fetch books.' });
  }
};

exports.createBookFormHandler = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    await axios.post(`${API}/books`, { title, author, genre, description }, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/books');
  } catch (err) {
    const error = err.response?.data?.error || err.message;
    res.render('addBook', { message: `Add book failed: ${error}` });
  }
};

exports.searchBooksPage = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.render('search', { books: [] });
  try {
    const { data } = await axios.get(`${API}/search`, { params: { query } });
    res.render('search', { books: data });
  } catch (err) {
    res.render('search', { books: [], message: 'Search error.' });
  }
};
