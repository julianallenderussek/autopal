const request = require('supertest');
const app = require('../../index'); // Your Express application

describe('POST /users', () => {
  it('creates a new user', async () => {
    const data = {
      first_name: 'Julian',
      last_name: 'Allende',
      email: "jallendebu.edu",
      phone: "81568150",
      role: "auto_seller",
      password: "12345678"
    };

    const response = await request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    console.lo(response.body)
    // Add more assertions as needed
  });
});