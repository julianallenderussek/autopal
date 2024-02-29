const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createSignedInUser } = require('../utils/users');

describe('POST /users', () => {
  
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    // createSignedInUser(app, {
    //   first_name: 'Julian',
    //   last_name: 'Allende',
    //   email: "jallendebu.edu",
    //   phone: "81568150",
    //   role: "seller",
    //   password: "12345678"
    // });
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('creates a new user', async () => {
    const data = {
      first_name: 'Julian',
      last_name: 'Allende',
      email: "julianallenderussek@gmail.com",
      phone: "81568150",
      role: "seller",
      password: "12345678"
    };

    const response = await request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeTruthy();
    expect(response.body).toHaveProperty('role');
    expect(response.body.token).toBeTruthy();
    // Add more assertions as needed
  });

  it('returns bad request missing email', async () => {
    // Missing email in data object
    const data = {
      first_name: 'Julian',
      last_name: 'Allende',
      phone: "81568150",
      role: "seller",
      password: "12345678"
    };

    const response = await request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Please provide an email");
  });
});