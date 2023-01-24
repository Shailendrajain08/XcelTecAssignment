const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

const port = process.env.port || 3000;

const authRoute = require('./routes/auth-router');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// parse application/json
app.use(bodyParser.json());

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/myMpp', (err) => {
    if (err) {
        console.log("Database is Not Connected !")
    } else {
        console.log("Database is Connected Successfully ")
    }
})

app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.send("Welcome to node in backend")
})

app.listen(port, () => {
    console.log("node server is connected at:", port);
})