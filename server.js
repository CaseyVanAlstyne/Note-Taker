// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
});

//adds a new note
app.post("/api/notes", function (req, res) {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        const dataArr = JSON.parse(data);
        dataArr.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(dataArr), function (err) {
            if (err) throw err;

            console.log("This is a New NOTE!")
        })
    })
    res.json(newNote);
    console.log("This is newNote", newNote);
});

//deletes a note by id
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const dataArr = JSON.parse(data);
        const newDataArr = dataArr.filter(note => {
            return note.id != req.params.id;
        })
        console.log(newDataArr);
        fs.writeFile("db/db.json", JSON.stringify(newDataArr), function (err) {
            if (err) throw err;

            console.log("Deleted Note");
        })
    })
    res.end();
});

// Appl begins listening for call
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})