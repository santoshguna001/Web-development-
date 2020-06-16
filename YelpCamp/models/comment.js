var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/YelpCamp", { useNewUrlParser: true, useUnifiedTopology: true });

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
});

module.exports = mongoose.model('Comment', commentSchema);