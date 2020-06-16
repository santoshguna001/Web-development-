var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

mongoose.connect("mongodb://localhost:27017/YelpCamp", { useNewUrlParser: true, useUnifiedTopology: true });
var data = [{
        name: 'Camp Desert, Pushkar',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/2283139011_a66e4eaefd_z_20190212183108.jpg',
        description: 'Being an Indian, we all know about the famous Pushkar fair. For those of us who don’t know, Pushkar fair is the largest cattle fair in India which attracts not only the local but also the global tourists on a large scale. The Camp Desert is a place which is picked by the people because of its proximity to Pushkar. Covering an area of 6 acres, it is designed in the complete Rajasthani style. The best time to visit this place is during the Pushkar fair which gives you a chance to experience the colourful culture and lifestyle of Rajasthan.'
    },
    {
        name: 'Mehar, Jaisalmer',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/25439743351_5e7c669338_z_20190212183635.jpg',
        description: 'For those of you looking for a stay in the deserts of Rajasthan, Mehar is the perfect place to plan your stay. Located near the dunes, the Mehar camp lets you experience the arid deserts of Jaisalmer from up close. It has been defined by tourists as a place to eat, drink and be merry! The camps have all the facilities to make it a comfortable stay and have your day packed with fun-filled activities. The main advantage of this place is its proximity to touristy places like Kuldhara, Damodara, Lodhruva and the other abandoned villages.'
    },
    {
        name: 'Coorg Planter’s Camp, Coorg',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/40058688553_db7ca0c3f2_z_20190212185858.jpg',
        description: 'Coorg is one of the top tourist destinations in the country and is thronged by people during the holiday seasons. However, very few of these tourists think of staying in the unconventional camp sites to make their stay ever more enjoyable. The Coorg Planter’s Camp is an eco camp built right in the middle of the forests. It provides you with an opportunity to visit the famous coffee and cardamom plantations of Coorg. Just take a walk through these plantations or relax near a waterfall and you will experience the healing touch of nature.'
    },
    {
        name: 'Kolli Hill Resorts, Trichy',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/29273867548_7168fe60e2_z_20190212190927.jpg',
        description: 'Kolli Hill Resorts is located in the Trichy region, close to Chennai. Known as the “Wild Orchard Camp” this place are a hotspot among archaeologists, astronomers, and nature lovers. This place is situated close to famous tourist destinations like Siddhar Caves, Sandana Parai, Mini Falls, and Agaya Gangai Waterfalls. This is a perfect place for a short getaway which lets you relax in the midst of nature. The best part of this place is the ever present aroma of cardamom, coffee, rice, and other spices.'
    }
];

function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed campgrounds');
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Added a campground');
                        Comment.create({
                                text: 'This place is great, but I wish there was interet',
                                author: 'Santosh'
                            },
                            function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created a new comment');
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;