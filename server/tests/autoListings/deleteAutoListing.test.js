const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils');

describe('PUT /auto_listing/:_id', () => {
  
  let token;
  let autoListingId;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  
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

    const response = await request(app)
      .post('/auto_listings')
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', token);

    autoListingId = response.body._id

  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Delete auto listing by id - correct id', async () => {
    const response = await request(app)
      .delete(`/auto_listings/${autoListingId}`)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.body).toHaveProperty('message');
  });

});