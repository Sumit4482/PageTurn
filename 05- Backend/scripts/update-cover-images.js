/**
 * Updates coverImage for all existing books to Open Library Covers API URLs (by ISBN).
 * Run: npm run update-covers  (or node scripts/update-cover-images.js)
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const connectToDatabase = require("../config/db.config");
const Book = require("../models/book.model");

const OPEN_LIBRARY_COVER_URL = "https://covers.openlibrary.org/b/isbn";

async function updateCovers() {
  try {
    await connectToDatabase();
    const books = await Book.find({});
    let updated = 0;
    for (const book of books) {
      if (book.isbn) {
        const coverUrl = `${OPEN_LIBRARY_COVER_URL}/${book.isbn}-M.jpg`;
        await Book.findByIdAndUpdate(book._id, { coverImage: coverUrl });
        console.log(`  Updated cover: ${book.title} (${book.isbn})`);
        updated++;
      }
    }
    console.log(`Done. Updated ${updated} book(s).`);
  } catch (err) {
    console.error("Update failed:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

updateCovers();
