Autopal
A marketplace of auto sellers and auto buyers

# Tech stack:
React.js, Node.js, Express, MongoDB, Mongoose

# Project Structure
Front-end  (React.js): 
  The front-end project is inside the:
    `/client`

Backend-end server  (Node.js/Express API): 
  The front-end project is inside the:
    `/server`

# Setup procedure:
  (It is recommended to run the project with Node 16.0.0 -> I runned into issues connecting to MongoDb while using Node 18.0.0)
### Back-end project:
CD into the server folder:
`cd /server`

Install dependencies:
`npm install`

Create a .env file inside /server with the follwing structure:
```
  PORT=4000
  MONGO_URI=mongodb://localhost:27017/autopal
  JWT_SECRET="my-secret"
```

Run backend project:
  This run it in development mode
  `npm run dev` 

  This run it in production mode
  `npm start` 

### Front-end project:
CD into the server folder:
`cd /client`

Install dependencies:
`npm install`

Create a .env file inside /server with the following structure:
```
  REACT_APP_API_URL=http://localhost:4000
```

Run front-end project:
  `npm start` 

# Database seeding:
The backend project has a seed.js script for populating the database with mock data that can be use for testing.

For populating the database make sure to first be able to run the backend project succesfully, created a database inside your local MongoDb instance and have setup your .env files inside the backend project

After completing the steps mentioned above. Run `npm run test` 


# Backend unit testing:
The backend project has unit and integration test in place using the npm libraries Jest and Supertest. To run the unit test in the backend. `cd server` and then run the test script `npm run test` or `npm run testWatch` if you want to run the test in watch mode. 
  
  