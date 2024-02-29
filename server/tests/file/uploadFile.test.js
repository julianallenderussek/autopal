const request = require('supertest');
const app = require('../../index'); // Your Express application
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils/users');
const fs = require('fs');
const FormData = require('form-data'); 
const axios = require('axios');

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
    token = result.token
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Uploading file', async () => {
    
    const filePath = `tests/test_files/test_car.jpg`;

    const response = await request(app)
      .post('/files')
      .timeout(10000)
      .attach('file', filePath);
        
    console.log("THE UNDEFINED,",response);
    expect(response.body).toBe(23)
  })
})