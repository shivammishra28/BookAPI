const Review = require('../model/review');
const Book = require('../model/books');

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({
      book: req.params.id,
      user: req.user._id,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Review creation failed', details: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err.message });
  }
};

exports.getBookDetailsWithReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { page = 1, limit = 5 } = req.query;
    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const averageRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    res.json({
      book,
      averageRating: averageRating[0]?.avg || 0,
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book details', details: err.message });
  }
};
