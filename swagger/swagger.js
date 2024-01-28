const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Music Tracker API',
    description: 'An API for managing albums and tracks.'
  },
  host: 'https://cse-341-project-2-vpbn.onrender.com/',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['../routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, routes, doc);