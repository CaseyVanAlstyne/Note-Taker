// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static files (CSS)
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));


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

//get all notes
app.get("/api/notes", function (req, res) {
    return res.json(db);
    console.log(db)
    newClass.getNote()
        .then((note) => res.json(note))
        // should read file and convert to array of objects, which is then registered to browser
        .catch((err) => res.status(500).json(err));
    // catches an error on status 500
});

//adds a new note
app.post("/api/notes", function (req, res) {
    console.log(req.body);
    res.send("This was a success, dummy!");
});

//deletes a note by id
app.delete("/api/notes/:id", function (req, res) {
});

// Appl begins listening for call
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});