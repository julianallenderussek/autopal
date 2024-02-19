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

  it('Testing Middleware', async () => {
    const data = {
      email: "pete@gmail.com",
      password: "12345678"
    };

    const response = await request(app)
      .post('/auto_listings')
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    // expect(response.body.token).toBeFalsy();
    expect(response.body.token).toBeTruthy();
    // Add more assertions as needed
  });

});