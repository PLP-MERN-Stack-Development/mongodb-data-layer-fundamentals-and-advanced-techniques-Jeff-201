/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
use('plp_bookstore');
db.createCollection("books");
db.books.insertMany([
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    published_year: 2019,
    price: 15.99,
    in_stock: true,
    pages: 336,
    publisher: "Celadon Books"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    published_year: 2018,
    price: 20.00,
    in_stock: true,
    pages: 320,
    publisher: "Penguin Random House"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    price: 10.50,
    in_stock: false,
    pages: 180,
    publisher: "Scribner"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    published_year: 2018,
    price: 14.00,
    in_stock: true,
    pages: 352,
    publisher: "Random House"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Memoir",
    published_year: 2018,
    price: 18.99,
    in_stock: false,
    pages: 448,
    publisher: "Crown"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    published_year: 1965,
    price: 12.99,
    in_stock: true,
    pages: 412,
    publisher: "Chilton Books"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    published_year: 2014,
    price: 22.50,
    in_stock: true,
    pages: 443,
    publisher: "Harper"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    published_year: 2020,
    price: 16.99,
    in_stock: true,
    pages: 304,
    publisher: "Canongate"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 9.99,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    published_year: 2021,
    price: 24.99,
    in_stock: true,
    pages: 496,
    publisher: "Ballantine Books"
  }
]);
printjson(db.books.find({ genre: "Memoir" }).toArray());
printjson(db.books.find({ published_year: { $gt: 2015 } }).toArray());
printjson(db.books.find({ author: "George Orwell" }).toArray());
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 12.00 } }
);
db.books.deleteOne({ title: "1984" });
printjson(db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).toArray());
printjson(db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).toArray());
printjson(db.books.find().sort({ price: 1 }).toArray());
printjson(db.books.find().sort({ price: -1 }).toArray());
printjson(db.books.find().limit(5).toArray());
printjson(db.books.find().skip(5).limit(5).toArray());
printjson(db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]).toArray());
printjson(db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]).toArray());
printjson(db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray());
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: -1 });
printjson(db.books.find({ title: "Dune" }).explain("executionStats"));
