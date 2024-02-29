const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils/users');
const { createAppointment } = require('../utils/appointments');

describe('GET /appointments/:_id', () => {
  let token;
  let appointmentId;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  
    body = await createAppointment(app);
    appointmentId = body.appointment._id
    token = body.buyerToken
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Querying appointment by id - correct id', async () => {
    const response = await request(app)
      .get(`/appointments/${appointmentId}`)
      .set('Accept', 'application/json')
      .set('authorization', token);
    
    expect(response.body.appointment).toHaveProperty('_id');
    expect(response.body.appointment).toHaveProperty('seller');
    expect(response.body.appointment).toHaveProperty('buyer');
  });

});