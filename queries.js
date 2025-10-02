CRUD Queries
db.books.find({ genre: "Memoir" })
db.books.find({ published_year: { $gt: 2015 } })
db.books.find({ author: "George Orwell" })
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 12.00 } }
)
db.books.deleteOne({ title: "1984" })
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
db.books.find().sort({ price: 1 })
db.books.find().sort({ price: -1 })
db.books.find().limit(5)
db.books.find().skip(5).limit(5)
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: -1 })
db.books.find({ title: "Dune" }).explain("executionStats")
