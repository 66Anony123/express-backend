// Filename: server.js

/**
 * Importing packages
 */
const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors')
require('dotenv').config()

const {
    NODE_ENV,
    DEV_MONGO_URL,
    PROD_MONGO_URL,
    PORT
} = process.env


// const DBURLCRUD='mongodb+srv://sonicgautam111:sonic123@cluster0.wqrtohy.mongodb.net/?retryWrites=true&w=majority';
// const DBURLLOCAL='mongodb://127.0.0.1:27017/Database';



// Import routes from routes/index.js
const router = require('./routes');

// Initialize express
const app = express();

// Parses the json data from request body
app.use(express.json());
app.use(cors("*"))
// Parses the query params from request url
app.use(express.urlencoded({ extended: true }));

// Uses imported routes in express
app.use('/', router);
 
console.log(process.env.DEV_MONGO_URL);

mongoose.connect(NODE_ENV==='development'?PROD_MONGO_URL:DEV_MONGO_URL)
  .then(() => {
      console.log('Database connected');
  })
  .catch((err) => {
      console.log(err);
  });

// Listen web requests on 3000 port
const port = PORT || 8000
app.listen(port, () => {
    console.log(`App listening on port localhost:${port}`);
});