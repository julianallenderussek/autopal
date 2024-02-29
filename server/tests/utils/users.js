const supertest = require("supertest");
const request = require("supertest");

exports.createSignedInUser = async (app, userData) => {
    const response = await request(app)
        .post("/users")
        .send(userData)
        .set("Accept", "application/json");

    return response.body;
};

exports.createAndLoginUser = async (app, userData) => {
    const createUserResponse = await request(app)
        .post("/users")
        .send(userData)
        .set("Accept", "application/json");

    const loginResponse = await request(app)
        .post("/users/login")
        .send({
            email: userData.email,
            password: userData.password,
        })
        .set("Accept", "application/json");
    
    return loginResponse.body
};

