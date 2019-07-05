const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Memo = new Schema({
    memo_content: {
        type: String
    }
});

module.exports = mongoose.model('Memo', Memo);
