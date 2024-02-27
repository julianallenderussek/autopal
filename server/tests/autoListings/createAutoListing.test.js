const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils');

describe('POST /auto_listing', () => {
  
  let token;
  
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
    console.log("THE RESULT", result)
    token = result.token
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Creating Auto Listing with Correct Body', async () => {
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

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe("Auto Listing created");
    // expect(response.body.token).toBeFalsy();
    // Add more assertions as needed
  });

  it('Error Missing Price', async () => {
    const data = {
      make: "Ford",
      model: "Mustang",
      year: 2024,
      city: "Victoria",
      state: "British Columbia",
      country:  "Canada",
      // price: 35450,
      milage: 76543,
      
    };

    const response = await request(app)
      .post('/auto_listings')
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // expect(response.body.token).toBeFalsy();
    // Add more assertions as needed
  });

});