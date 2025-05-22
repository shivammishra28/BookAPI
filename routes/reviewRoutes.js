const express = require('express');

const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  getBookDetailsWithReviews
} = require('../controllers/reviewController');
const   authMiddleware = require('../middleware/auth');

router.get('/books/:id', getBookDetailsWithReviews);
router.post('/books/:id/reviews', authMiddleware, createReview);
router.put('/reviews/:id', authMiddleware, updateReview);
router.delete('/reviews/:id', authMiddleware, deleteReview);

module.exports = router;