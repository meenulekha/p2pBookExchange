const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    ratings: [{ type: Number }],
    reviews: [{ type: String }],
    poster: { type: String, required: true },
    emailOfPoster: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
