const request = require('supertest');
const app = require('./../index'); // Your Express application

describe('GET /', () => {
  it('responds with "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.body).toBe("Hello World");
    expect(response.statusCode).toBe(200);
  });
});

// Add more test cases for other endpoints as needed
