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
  let appointment;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  
    appointment = await createAppointment(app);
  })
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('Querying appointment by id - correct id', async () => {
    const response = await request(app)
      .get(`/appointments/id/${appointment.appointment._id}`)
      .set('Accept', 'application/json')
      .set('authorization', appointment.buyer.token);
    
    expect(response.body.appointment).toHaveProperty('_id');
    expect(response.body.appointment).toHaveProperty('seller');
    expect(response.body.appointment).toHaveProperty('buyer');
  });

});