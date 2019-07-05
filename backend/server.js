const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const memoRouter = express.Router();
const PORT = 4000;

const Memo = require('./model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/memos', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection estublished successfully");
});

// TODO: Implementation
memoRouter.route('/random').get((req, res) => {
    console.log("Memo Reminder Application...");
    res.status(200).send("Memo Reminder Application...");
});

memoRouter.route('/list').get((req, res) => {
    Memo.find((err, memos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(memos);
        }
    });
});

memoRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    Memo.findById(id, (err, memo) => {
        if (err) {
            res.status(400).send("find memo failed");
        } else {
            res.json(memo);
        }
    })
});

memoRouter.route('/add').post((req, res) => {
    let memo = new Memo(req.body);
    memo.save()
        .then(memo => {
            res.status(200).json({'memo': "memo added successfully"});
        })
        .catch(err => {
            res.status(400).send("adding new memo failed")
        });
});

// TODO: Implementation
memoRouter.route('/update/:id').post((req, res) => {
    console.log("Memo Reminder Application...");
    res.status(200).send("Memo Reminder Application...");
});

memoRouter.route('/delete/:id').get((req, res) => {
    const id = req.params.id;
    Memo.findById(id).remove(err => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log("memo deleted successfully");
            res.status(200).json({'memo': "memo deleted successfully"});
        }
    });
});

app.use('/memos', memoRouter);

app.listen(PORT, function() {
    console.log("Server is ready...");
});
