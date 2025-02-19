const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true }
});

const JokeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  votes: { type: [VoteSchema], default: [] },
  availableVotes: { type: [String], required: true }  
});

const Joke = mongoose.model('Joke', JokeSchema);

module.exports = { Joke };