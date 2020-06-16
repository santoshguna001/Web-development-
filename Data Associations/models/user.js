var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/association_demo_references", { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);