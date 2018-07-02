var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    task: String,
    duedate: Date,
    complete: String,
    author: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("Item", ItemSchema);
