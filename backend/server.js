const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/memos', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection estublished successfully");
});

app.listen(PORT, function() {
    console.log("Server is ready...");
});
