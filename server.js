const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
//require models
const db = require("./models");
// middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/book",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

);
// Define API routes here
//search route
app.get("/search/:search", (req, res) => {
  let search = req.params.search;
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + search)
    .then(function (response) {
      let books = response.data.items;
      
      let array = [];
      for (let i = 0; i < books.length; i++) {
        if (
          books[i].volumeInfo.imageLinks !== undefined &&
          books[i].volumeInfo.authors !== undefined
        ) {
          let bookInfo = {
            title: books[i].volumeInfo.title,
            authors: books[i].volumeInfo.authors,
            description: books[i].volumeInfo.description,
            image: books[i].volumeInfo.imageLinks.smallThumbnail,
            link: books[i].volumeInfo.infoLink,
          };
          array.push(bookInfo);
        }
      }
      db.Book.create(array)
        .then((dbBook) => res.json(dbBook))
        .catch((err) => res.json(err));
    });
});
//get saved books 
app.get("/api/books", (req, res) => {
  db.Book.find({ saved: true })
    .then((dbBook) => res.json(dbBook))
    .catch((err) => res.json(err));
});
//save a book 
app.post("/api/books/:id", (req, res) => {
  db.Book.findOneAndUpdate(
    { _id: req.params.id },
    { saved: true },
    { new: true }
  ).then((dbBook) => {
    res.json(dbBook);
  });
});
//delete all unsaved books
app.delete("/api/books", (req, res) => {
  db.Book.deleteMany({ saved: false }).then((dbBooks) => res.json(dbBooks));
});
//delete a book 
app.delete("/api/books/:id", (req, res) => {
  db.Book.deleteOne({ _id: req.params.id }).then((dbBook) => res.json(dbBook));
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
