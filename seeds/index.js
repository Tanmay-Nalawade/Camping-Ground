const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');      //require the model

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  //  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];          // to pick a random number from an array


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {                               //cities of random 48.city
    const random1000 = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '618e08f3c8c9be1954c69d56',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dzrvqaezl/image/upload/v1637219351/YelpCamp/o5sehk046dwyxdznjiof.jpg',
          filename: 'YelpCamp/o5sehk046dwyxdznjiof',
        },
        {
          url: 'https://res.cloudinary.com/dzrvqaezl/image/upload/v1637219351/YelpCamp/e7euhgluf4obuf0lba99.jpg',
          filename: 'YelpCamp/e7euhgluf4obuf0lba99',
        },
        {
          url: 'https://res.cloudinary.com/dzrvqaezl/image/upload/v1637219351/YelpCamp/k6b1njkj7kcfhfw9ypwa.jpg',
          filename: 'YelpCamp/k6b1njkj7kcfhfw9ypwa',
        }
      ]
    })
    await camp.save();
  }
}



seedDB().then(() => {
  mongoose.connection.close()
});