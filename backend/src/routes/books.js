const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const bookController = require('../controllers/bookController');

router.post('/:bookId/ratings', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        //add rating
        book.ratings.push(req.body.rating);
        await book.save();

        res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new review
router.post('/:bookId/reviews', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.reviews.push(req.body.review);
        await book.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const aveRating = await bookController.getAverageRating(req.params.bookId);

        res.json({ book, aveRating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
