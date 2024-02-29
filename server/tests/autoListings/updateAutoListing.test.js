const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils/users');

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

  it('Updating auto listing by id - correct id', async () => {
    const data = {
      make: "BMW",
      model: "320",
      year: 2020,
      city: "Victoria",
      state: "British Columbia",
      country:  "Canada",
      price: 35450,
      milage: 76543,
    };

    let response = await request(app)
      .put(`/auto_listings/${autoListingId}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', token);
    
    response = await request(app)
      .get(`/auto_listings/${autoListingId}`)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.body).toHaveProperty('autoListing');
    expect(response.body.autoListing.make).toBe('BMW');

  });

  it('Updating auto listing by id - incorrect id', async () => {
    const response = await request(app)
      .get(`/auto_listings/${autoListingId}123213`)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');

  });


});