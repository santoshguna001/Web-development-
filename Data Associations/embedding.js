var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/association_demo", { useNewUrlParser: true, useUnifiedTopology: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);

var Post = mongoose.model('Post', postSchema);

// var newUser = new User({
//     email: 'santoshgunashekar@gmail.com',
//     name: 'santoshguna001'
// });
// newUser.posts.push({
//     title: 'Sample 1',
//     content: 'sample content 1'
// });
// newUser.save(function(err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// Post.create({
//     title: 'Reflections on Apples',
//     comment: 'They are delicious'
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

User.findOne({ name: 'santoshguna001' }, function(err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
        user.posts.push({
            title: 'sample 2',
            content: 'Sample content 2'
        });
        user.save(function(err, user) {
            if (err) {
                console.log(eor);
            } else {
                console.log(user);
            }
        });
    }
});