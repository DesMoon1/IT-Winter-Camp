const mongoose = require('mongoose');
const { seedJokes } = require('./seeder');
require('dotenv').config();

function connectToDatabase() {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
    return seedJokes();
  }).catch(err => {
    console.error('Could not connect to MongoDB:', err);
    throw err;
  });
}

module.exports = { connectToDatabase };