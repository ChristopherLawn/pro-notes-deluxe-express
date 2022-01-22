const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid')

router.get("/notes", (req, res) => {
    fs.readFile((path.join(__dirname, '../../db/db.json')), 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {
    const newNote = req.body
    const newId = uuidv4()
    newNote.id = newId
    fs.readFile((path.join(__dirname, '../../db/db.json')), 'utf8', (err, data) => {
        if (err) throw err;
        const currentNotes = JSON.parse(data);
        currentNotes.push(newNote);
        fs.writeFile((path.join(__dirname, '../../db/db.json')), JSON.stringify(currentNotes), (err) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(newNote)
            }
        });
    });
});

router.delete("/notes/:id", (req, res) => {
    fs.readFile((path.join(__dirname, '../../db/db.json')), 'utf8', (err, data) => {
        if (err) throw err;
        const currentNotes = JSON.parse(data);
        const noteId = req.params.id;

        const newNotesArray = currentNotes.filter((note => note.id !== noteId));
        fs.writeFile((path.join(__dirname, '../../db/db.json')), JSON.stringify(newNotesArray), (err) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(newNotesArray)
            }
        });
    })
});

module.exports = router;