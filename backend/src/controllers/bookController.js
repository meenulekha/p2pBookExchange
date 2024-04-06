const Book = require('../models/Book');

exports.getAverageRating = async (bookId) => {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return null; 
        }

        // Calculate avg rating
        const sum = book.ratings.reduce((total, rating) => total + rating, 0);
        const averageRating = sum / book.ratings.length;

        return averageRating;
    } catch (error) {
        console.error('Error calculating average rating:', error);
        return null; 
    }
};
