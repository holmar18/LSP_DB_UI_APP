const Login = require('./login').Login;

const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');


const importedData = require("./data.json");

app.use(bodyParser.json());

let port = process.env.PORT || 4000;


app.use(cors());

app.get("/", (req, res) => {
    res.send("Connected");
})

app.get("/mix", (req, res) => {
    res.send(importedData['mix'])
})

app.post("/", (req, res) => {
    const data = req.body;
    if (data.name === Login.name && data.password === Login.password) { 
        console.log(`Login ${data.name} successfull`)
        return res.status(200).json({ status: true });
    } else {
        return res.status(202).json({ status: false });
    }
})

// POST : Bætir nýu í skránna
app.post('/mix/new', (req, res) => {
    const data = req.body;
    var error;

    if (data.id !== undefined ) {
        importedData["mix"].push(data)
        var dataString = JSON.stringify(importedData, null, 2)
        fs.writeFile('./data.json', dataString, finished);
    }

    console.log(`New item ${data.name} has been added`)

    function finished(err) { 
        console.log("All done")
    }

    return res.status(200).json({ status: true });
});


// PATCH : Lagar færslu sem er nú þegar til
app.patch('/mix/new/:newId', (req, res) => {
    const data = req.body;

    importedData["mix"][data.id] = data
    var dataString = JSON.stringify(importedData, null, 2)

    fs.writeFile('./data.json', dataString, finished);

    function finished(err) { console.log("All done") }

    return res.send(`New item ${data.name} has been updated`);
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});