var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/association_demo_references", { useNewUrlParser: true, useUnifiedTopology: true });


var Post = require('./models/post');
var User = require('./models/user');


// Post.create({
//     title: 'how to do 4',
//     content: 'aadsfsdjk 4'
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         User.findOne({ email: 'mailtosantosh@gmail.com' }, function(err, user) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 user.posts.push(result);
//                 user.save(function(err, result) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(user);
//                     }
//                 });
//             }
//         });
//     }
// });


User.findOne({ email: 'mailtosantosh@gmail.com' }).populate('posts').exec(function(err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});



// User.create({
//     email: 'mailtosantosh@gmail.com',
//     name: 'santoshg'
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });