const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils/users');
const { createAutoListing } = require('../utils/listings');

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
      role: "buyer",
      password: "12345678"
    });
    token = result.token
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Creating Appointment with Correct Body', async () => {
    const { listing, seller  } = await createAutoListing(app)
    
    const {autoListing } = listing

    const now = new Date();
    const nowPlusOneHour = new Date();
    nowPlusOneHour.setTime(now.getTime() + (1 * 60 * 60 * 1000)); 

    const data = {
      seller: seller.sellerData._id,
      listing: autoListing._id,
      fromDateTime: now,
      toDateTime: nowPlusOneHour
    }

    const response = await request(app)
      .post('/appointments')
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', token);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.message).toBe('Appointment created');
  });

});