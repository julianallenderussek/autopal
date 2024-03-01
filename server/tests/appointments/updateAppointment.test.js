const request = require('supertest');
const app = require('../../index'); // Your Express application
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require("mongoose");
const { createAndLoginUser } = require('../utils/users');
const { createAppointment } = require('../utils/appointments');

describe('PUT /appointments/:_id', () => {
  let token;
  let appointmentId;
  let appointment 

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  
    appointment = await createAppointment(app);
  })

  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  const data = ({'status': 'confirmed'})

  it('Confirming appointment by id - correct id', async () => {
    const response = await request(app)
      .put(`/appointments/${appointment.appointment._id}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', appointment.seller.token);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('status');
  });

});