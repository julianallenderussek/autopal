const supertest = require("supertest");
const request = require("supertest");
const { createAndLoginUser } = require("./users");

exports.createAutoListing = async (app) => {
  const result = await createAndLoginUser(app, {
      first_name: 'James',
      last_name: 'Smith',
      email: "pete@gmail.com",
      phone: "81568150",
      role: "seller",
      password: "12345678"
  });
  token = result.token
  
  const data = {
    make: "Ford",
    model: "Mustang",
    year: 2024,
    city: "Victoria",
    state: "British Columbia",
    country:  "Canada",
    price: 35450,
    milage: 76543,
  };

  let response = await request(app)
    .post('/auto_listings')
    .send(data)
    .set('Accept', 'application/json')
    .set('authorization', token);
    
  const listingId = response.body._id

  response = await request(app)
    .get(`/auto_listings/${listingId}`)
    .set('Accept', 'application/json')
    .set('authorization', token);

  const listing = response.body
  return listing
};

