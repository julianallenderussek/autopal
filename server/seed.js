const User = require("./model/User");
const AutoListing = require("./model/AutoListing");
const mongoose = require("mongoose");
const { getRandom } = require("./utils/utils");
const Appointment = require("./model/Appointment");
require('dotenv').config();
const bcrypt = require('bcrypt');


mongoose.connect(process.env.MONGO_URI)
const salt = 10;

const buyers = [{
  first_name: 'Pablo',
  last_name: 'Picasso',
  email: "buyerone@gmail.com",
  phone: "11111111",
  role: "buyer"
},
{
  first_name: 'James',
  last_name: 'Doe',
  email: "buyertwo@gmail.com",
  phone: "2222222",
  role: "buyer"
}
]

const sellers = [{
  first_name: 'Miguel',
  last_name: 'Angel',
  email: "sellerone@gmail.com",
  phone: "121212121",
  role: "seller"
},
{
  first_name: 'Paulina',
  last_name: 'Smith',
  email: "sellertwo@gmail.com",
  phone: "212121212",
  role: "seller"
}
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,2009]
const makes = ["Ford", "BMW", "Audi", "Mazda", "Volvo", "Volkswagen"]
const models = ["Super GT", "SUV Special", "GT450", "Mustang", "Tiguan"]

const listings = [
  {
    make: getRandom(makes),
    model: getRandom(models),
    year: getRandom(years),
    city: "Los Angeles",
    state: "California",
    country: "USA",
    price: getRandomInt(20000, 40000),
    milage: getRandomInt(40000, 120000),
    status: "published",
    owner: ""
  },
  {
    make: getRandom(makes),
    model: getRandom(models),
    year: getRandom(years),
    city: "Los Angeles",
    state: "California",
    country: "USA",
    price: getRandomInt(20000, 40000),
    milage: getRandomInt(40000, 120000),
    status: "published",
    owner: ""
  },
  {
    make: getRandom(makes),
    model: getRandom(models),
    year: getRandom(years),
    city: "Victoria",
    state: "British Columbia",
    country: "Canada",
    price: getRandomInt(20000, 40000),
    milage: getRandomInt(40000, 120000),
    status: "published",
    owner: ""
  },
  {
    make: getRandom(makes),
    model: getRandom(models),
    year: getRandom(years),
    city: "Victoria",
    state: "British Columbia",
    country: "Canada",
    price: getRandomInt(20000, 40000),
    milage: getRandomInt(40000, 120000),
    status: "published",
    owner: ""
  }
]

async function run() {

  console.log("Dropping past collections")
  await mongoose.connection.dropCollection(User.collection.name)
  await mongoose.connection.dropCollection(AutoListing.collection.name)
  await mongoose.connection.dropCollection(Appointment.collection.name)
  
  const password = "123"
  const hashPassword = await bcrypt.hash(password,salt);

  // Buyers
  let buyerOne = new User({...buyers[0], password: hashPassword});
  buyerOne = await buyerOne.save();
  let buyerTwo = new User({...buyers[1], password: hashPassword});
  buyerTwo = await buyerTwo.save();
  
  // Sellers
  let sellerOne = new User({...sellers[0], password: hashPassword});
  sellerOne = await sellerOne.save();
  let sellerTwo = new User({...sellers[1], password: hashPassword});
  sellerTwo = await sellerTwo.save();

  let autoListingOne = new AutoListing({...listings[0], owner: sellerOne._id});
  autoListingOne = await autoListingOne.save();
  let autoListingTwo = new AutoListing({...listings[1], owner: sellerOne._id});
  autoListingTwo = await autoListingTwo.save();
  let autoListingThree = new AutoListing({...listings[2], owner: sellerTwo._id});
  autoListingThree = await autoListingThree.save();
  let autoListingFour = new AutoListing({...listings[3], owner: sellerTwo._id});
  autoListingFour = await autoListingFour.save();

  const currentDate = new Date();
  const tomorrow = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
  const dayAfterTomorrow = new Date(currentDate.getTime() + (48 * 60 * 60 * 1000));
  
  let appointmentOne = new Appointment(
    { 
      buyer: buyerOne._id, 
      seller: sellerOne._id, 
      listing: autoListingOne._id, 
      status: "pending", 
      fromDateTime: tomorrow,
      toDateTime: tomorrow.setHours(tomorrow.getHours() + 1)
    }
  )
  appointmentOne = await appointmentOne.save()
    
  let appointmentTwo = new Appointment(
    { 
      buyer: buyerTwo._id, 
      seller: sellerOne._id, 
      listing: autoListingOne._id, 
      status: "pending", 
      fromDateTime: dayAfterTomorrow,
      toDateTime: dayAfterTomorrow.setHours(dayAfterTomorrow.getHours() + 1)
    }
  )
  appointmentTwo = await appointmentTwo.save()
  
  console.log("Finished seeding")  
}

run()

// console.log("SEEDING DATABASE", getRandom(passwords))

