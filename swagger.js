const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Music Tracker API',
    description: 'An API for managing users and tracks.'
  },
  host: 'music-library-jb1z.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, routes, doc);