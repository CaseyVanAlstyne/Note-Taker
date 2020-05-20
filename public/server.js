// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Routes for pathing
// =============================================================
// routes user to index html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// routes user to notes html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//static files (CSS)
app.use(express.static(__dirname + '/public'));

//get all notes
app.get("/api/notes", function (req, res) {
    // return res.json(notes);
});

//adds a new note
app.post("/api/notes", function (req, res) {
});

//deletes a note by id
app.delete("/api/notes/:id", function (req, res) {
});

// Appl begins listening for call
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});