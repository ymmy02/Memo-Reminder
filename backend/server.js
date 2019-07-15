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

const fs = require('fs');
const mongoUrl = fs.existsSync('/.dockerenv') ? 'mongo' : 'localhost';  // Check environment on Docker or Not
mongoose.connect(`mongodb://${mongoUrl}:27017/memos`, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection estublished successfully");
});

memoRouter.route('/random').get((req, res) => {
    const numMemos = parseInt(req.query.num);
    Memo.aggregate([{ $sample: {size: numMemos} }], (err, memos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(memos);
        }
    });
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
            res.status(200).json({'newMemo': memo});
        })
        .catch(err => {
            res.status(400).send("adding new memo failed")
        });
});

memoRouter.route('/update/:id').post((req, res) => {
    const id = req.params.id;
    Memo.findById(id, (err, memo) => {
        if (!memo) {
            res.status(404).send('data is not found');
        } else {
            memo.memo_content = req.body.memo_content;

            memo.save().then(memo => {
                res.send("Memo updated");
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
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
