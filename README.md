📚 PLP Bookstore MongoDB Project

This project demonstrates MongoDB fundamentals — from setup, CRUD operations, advanced queries, aggregation pipelines, and indexing — using a sample bookstore database.

🚀 Setup Instructions
1. Install Node.js

Download from https://nodejs.org

During installation, check "Add to PATH"

Verify installation:

node -v
npm -v

2. Install MongoDB

Option A (Local): Install MongoDB Community Edition → https://www.mongodb.com/try/download/community

Option B (Cloud): Create a free MongoDB Atlas cluster → https://www.mongodb.com/atlas

3. Install MongoDB Driver

Inside your project folder:

npm init -y
npm install mongodb

4. Insert Sample Data

Run the ready-made script:

node insert_books.js


This will create:

Database: plp_bookstore

Collection: books

Inserts 10 sample book documents

📝 CRUD Queries
Find all books in a specific genre
db.books.find({ genre: "Memoir" })

Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

Find books by a specific author
db.books.find({ author: "George Orwell" })

Update the price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 12.00 } }
)

Delete a book by its title
db.books.deleteOne({ title: "1984" })

🔎 Advanced Queries
Books in stock & published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

Projection (only title, author, price)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

Sorting by price

Ascending:

db.books.find().sort({ price: 1 })


Descending:

db.books.find().sort({ price: -1 })

Pagination (5 per page)

Page 1:

db.books.find().limit(5)


Page 2:

db.books.find().skip(5).limit(5)

📊 Aggregation Pipelines
Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

Group books by decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

⚡ Indexing & Performance
Index on title
db.books.createIndex({ title: 1 })

Compound index on author & published_year
db.books.createIndex({ author: 1, published_year: -1 })

Check query performance
db.books.find({ title: "Dune" }).explain("executionStats")


You should see fewer documents scanned after creating the index.

✅ Expected Outcome

Database: plp_bookstore

Collection: books with 10 documents

Working CRUD, advanced queries, aggregations, and indexing

Improved performance with indexes