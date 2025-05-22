const Book = require('../model/books');


exports.createBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, createdBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Book creation failed', details: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({ total, page: parseInt(page), books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get book', details: err.message });
  }
};
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Search query is required' });

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};