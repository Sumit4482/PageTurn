/**
 * Seed script: populates the database with dummy users and books.
 * Run with: npm run seed (or node scripts/seed.js from backend root)
 * Requires: MongoDB running, .env with MONGO_URI
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const connectToDatabase = require("../config/db.config");
const User = require("../models/user.model");
const Book = require("../models/book.model");
const bcrypt = require("bcrypt");

const users = [
  {
    username: "admin",
    email: "admin@pageturn.com",
    password: "admin123",
    fullName: "Admin User",
    dateOfBirth: "1990-01-01",
    gender: "male",
    country: "India",
    interests: ["fiction", "mystery"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: true,
  },
  {
    username: "alice_smith",
    email: "alice_smith@example.com",
    password: "alice123",
    fullName: "Alice Smith",
    dateOfBirth: "1990-09-20",
    gender: "female",
    country: "India",
    interests: ["fantasy", "history"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "sam_jackson",
    email: "sam_jackson@example.com",
    password: "sam123",
    fullName: "Sam Jackson",
    dateOfBirth: "1988-04-10",
    gender: "male",
    country: "India",
    interests: ["mystery", "self-help"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "lisa_brown",
    email: "lisa_brown@example.com",
    password: "lisa123",
    fullName: "Lisa Brown",
    dateOfBirth: "1993-12-28",
    gender: "female",
    country: "India",
    interests: ["thriller", "travel"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "max_carter",
    email: "max_carter@example.com",
    password: "max123",
    fullName: "Max Carter",
    dateOfBirth: "1985-07-03",
    gender: "male",
    country: "India",
    interests: ["science fiction", "poetry"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "emily_wilson",
    email: "emily_wilson@example.com",
    password: "emily123",
    fullName: "Emily Wilson",
    dateOfBirth: "1997-03-18",
    gender: "female",
    country: "India",
    interests: ["biography", "young adult"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "alex_jones",
    email: "alex_jones@example.com",
    password: "alex123",
    fullName: "Alex Jones",
    dateOfBirth: "1980-11-05",
    gender: "male",
    country: "India",
    interests: ["history", "children"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "olivia_clark",
    email: "olivia_clark@example.com",
    password: "olivia123",
    fullName: "Olivia Clark",
    dateOfBirth: "1992-06-25",
    gender: "female",
    country: "India",
    interests: ["self-help", "horror"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
  {
    username: "jacob_miller",
    email: "jacob_miller@example.com",
    password: "jacob123",
    fullName: "Jacob Miller",
    dateOfBirth: "1983-09-12",
    gender: "male",
    country: "India",
    interests: ["cookbooks", "graphic novels"],
    wantToRead: [],
    currentlyReading: [],
    read: [],
    isAdmin: false,
  },
];

const books = [
  {
    isbn: "9780141439846",
    title: "Jane Eyre",
    authors: ["Charlotte Brontë"],
    genre: "fiction",
    description: "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name 'Currer Bell', on 16 October 1847.",
    publishedDate: "1847-10-16",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141439846-M.jpg",
    language: "English",
    publisher: "Smith, Elder & Co.",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780060935467",
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    genre: "fiction",
    description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960.",
    publishedDate: "1960-07-11",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780060935467-M.jpg",
    language: "English",
    publisher: "J. B. Lippincott & Co.",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780451524935",
    title: "Animal Farm",
    authors: ["George Orwell"],
    genre: "fiction",
    description: "Animal Farm is an allegorical novella by George Orwell, first published in England on 17 August 1945.",
    publishedDate: "1945-08-17",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg",
    language: "English",
    publisher: "Secker and Warburg",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780140283334",
    title: "Where the Wild Things Are",
    authors: ["Maurice Sendak"],
    genre: "children",
    description: "Where the Wild Things Are is a 1963 children's picture book by American writer and illustrator Maurice Sendak.",
    publishedDate: "1963-04-02",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780140283334-M.jpg",
    language: "English",
    publisher: "Harper & Row",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9781451673319",
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    genre: "fiction",
    description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.",
    publishedDate: "1925-04-10",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781451673319-M.jpg",
    language: "English",
    publisher: "Charles Scribner's Sons",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780307353169",
    title: "The Road",
    authors: ["Cormac McCarthy"],
    genre: "fiction",
    description: "The Road is a post-apocalyptic novel by American writer Cormac McCarthy, published in 2006.",
    publishedDate: "2006-09-26",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307353169-M.jpg",
    language: "English",
    publisher: "Alfred A. Knopf",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780140283335",
    title: "The Catcher in the Rye",
    authors: ["J.D. Salinger"],
    genre: "fiction",
    description: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
    publishedDate: "1951-07-16",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780140283335-M.jpg",
    language: "English",
    publisher: "Little, Brown and Company",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780061120084",
    title: "The Alchemist",
    authors: ["Paulo Coelho"],
    genre: "fiction",
    description: "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988.",
    publishedDate: "1988-01-01",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg",
    language: "Portuguese",
    publisher: "HarperTorch",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780141185077",
    title: "The Picture of Dorian Gray",
    authors: ["Oscar Wilde"],
    genre: "fiction",
    description: "The Picture of Dorian Gray is a Gothic and philosophical novel by Oscar Wilde, first published complete in the July 1890 issue of Lippincott's Monthly Magazine.",
    publishedDate: "1890-07-20",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141185077-M.jpg",
    language: "English",
    publisher: "Lippincott's Monthly Magazine",
    edition: "1st",
    reviews: [],
  },
  {
    isbn: "9780062567591",
    title: "The Sun Also Rises",
    authors: ["Ernest Hemingway"],
    genre: "fiction",
    description: "The Sun Also Rises is a 1926 novel by American writer Ernest Hemingway.",
    publishedDate: "1926-10-22",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062567591-M.jpg",
    language: "English",
    publisher: "Charles Scribner's Sons",
    edition: "1st",
    reviews: [],
  },
];

async function seed() {
  try {
    await connectToDatabase();
    console.log("Seeding users...");
    for (const u of users) {
      const existing = await User.findOne({ $or: [{ email: u.email }, { username: u.username }] });
      if (existing) {
        console.log(`  Skip (exists): ${u.username}`);
        continue;
      }
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({
        ...u,
        password: hashedPassword,
        dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth) : undefined,
      });
      console.log(`  Created user: ${u.username}`);
    }

    console.log("Seeding books...");
    for (const b of books) {
      const existing = await Book.findOne({ isbn: b.isbn });
      if (existing) {
        console.log(`  Skip (exists): ${b.title}`);
        continue;
      }
      await Book.create({
        ...b,
        publishedDate: b.publishedDate ? new Date(b.publishedDate) : undefined,
      });
      console.log(`  Created book: ${b.title}`);
    }

    console.log("Seed completed.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
