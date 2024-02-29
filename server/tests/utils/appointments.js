const supertest = require("supertest");
const request = require("supertest");
const { createAndLoginUser } = require("./users");
const { createAutoListing } = require("./listings");

exports.createAppointment = async (app) => {
  const { autoListing } = await createAutoListing(app)
  const result = await createAndLoginUser(app, {
    first_name: 'James',
    last_name: 'Smith',
    email: "pete@gmail.com",
    phone: "81568150",
    role: "buyer",
    password: "12345678"
  });
  
  const buyerToken = result.token
  
  const now = new Date();
    const nowPlusOneHour = new Date();
    nowPlusOneHour.setTime(now.getTime() + (1 * 60 * 60 * 1000)); 

    const data = {
      seller: autoListing.owner._id,
      listing: autoListing._id,
      fromDateTime: now,
      toDateTime: nowPlusOneHour
    }

    const response = await request(app)
      .post('/appointments')
      .send(data)
      .set('Accept', 'application/json')
      .set('authorization', buyerToken);
    
    const appointment = response.body
    return { appointment, buyerToken: buyerToken}
};

