var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/association_demo_references", { useNewUrlParser: true, useUnifiedTopology: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Post', postSchema);