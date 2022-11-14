const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const fs = require('fs');

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post("/submit", (req, res) => {
    const name = req.body.firstName.trim() + ' ' + req.body.lastName.trim();
    res.send(name + " submitted successfully!");

    const f = fs.openSync('data/names.txt', 'a');
    fs.appendFileSync(f, name + '\n');
    fs.close(f);
});

app.get("/names", (req, res) => {
    const f = fs.openSync('data/names.txt', 'r');
    const names = fs.readFileSync(f).toString().split('\n');
    res.send('<p>' + names.join('</p><p>') + '</p>');
    fs.close(f);
});

const server = app.listen(8080, () => {
    console.log("Server is up!");
});
