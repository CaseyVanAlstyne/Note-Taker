const util = require('util');
const fs = require('fs');

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class newClass {
    read() {
        return readData("db/db.json", "utf8");
    }
    write(note) {
        return writeData("db/db.json", JSON.stringify(note));
    }
    getNote() {
        return this.read()
            .then(note => {
                let pNote = JSON.parse(note);
                return pNote;
            })
    }

    addNote


    removeNote


}