const supertest = require("supertest");
const request = require("supertest");
const { createAndLoginUser } = require("./users");
const { createAutoListing } = require("./listings");

exports.createAppointment = async (app) => {
  const { listing, seller } = await createAutoListing(app)
  const { autoListing } = listing;
  
  const buyer = {
    first_name: 'Pancho',
    last_name: 'Sanchez',
    email: "pancho@gmail.com",
    phone: "55555",
    role: "buyer",
    password: "12345678"
  }

  const result = await createAndLoginUser(app, buyer);
  
  const buyerToken = result.token
  
  buyer['token'] = buyerToken
 
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
    return { appointment, seller, buyer}
};

