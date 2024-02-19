const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createSignedInUser } = require('../utils');

describe('POST /users', () => {
  
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    
    const result = await createSignedInUser(app, {
      first_name: 'James',
      last_name: 'Smith',
      email: "james@gmail.com",
      phone: "81568150",
      role: "seller",
      password: "12345678"
    });
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Successfully login user', async () => {
    const data = {
      email: "james@gmail.com",
      password: "12345678"
    };

    const response = await request(app)
      .post('/users/login')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    // expect(response.body.token).toBeFalsy();
    expect(response.body.token).toBeTruthy();
    // Add more assertions as needed
  });

  it('Login with incorrect password', async () => {
    const data = {
      email: "james@gmail.com",
      // Correct password is -> "12345678"
      password: "abcdefg"
    };

    const response = await request(app)
      .post('/users/login')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    // expect(response.body.token).toBeFalsy();
    expect(response.body.error).toBe("Incorrect Password");
    // Add more assertions as needed
  });

  it('Sending non existing user, false email', async () => {
    const data = {
      email: "mrfalse@gmail.com",
      password: "abcdefg"
    };

    const response = await request(app)
      .post('/users/login')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
    // expect(response.body.token).toBeFalsy();
    expect(response.body.error).toBe("User not found");
    // Add more assertions as needed
  });

});