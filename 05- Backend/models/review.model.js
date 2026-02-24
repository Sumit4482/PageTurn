const mongoose = require("mongoose");

/**
 * Represents a review of a book.
 * @typedef {Object} Review
 * @property {string} book - The ID of the book being reviewed.
 * @property {string} user - The ID of the user who wrote the review.
 * @property {number} rating - The rating given by the user (between 1 and 5).
 * @property {string} content - The content of the review.
 * @property {string[]} likes - An array of user IDs who liked the review.
 * @property {number} likeCount - The number of likes the review has received.
 * @property {object[]} comments - An array of comment objects on the review.
 * @property {string} comments.user - The ID of the user who commented.
 * @property {string} comments.comment - The content of the comment.
 * @property {Date} comments.createdAt - The timestamp when the comment was created.
 * @property {number} commentCount - The number of comments on the review.
 * @property {Date} createdAt - The timestamp when the review was created.
 */

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
module.exports.reviewSchema = reviewSchema;
