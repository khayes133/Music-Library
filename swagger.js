const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2 with OAuth 2',
    description: 'An API for managing users and tracks.'
  },
  host: 'oauth2isapain.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, routes, doc);