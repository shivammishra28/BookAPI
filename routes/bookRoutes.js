const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookById, searchBooks } = require('../controllers/bookController');
const  authMiddleware  = require('../middleware/auth');
const pageController = require('../controllers/pageController');

router.post('/books', authMiddleware, createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/search', searchBooks);

module.exports = router;
