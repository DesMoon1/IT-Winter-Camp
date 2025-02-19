const express = require('express');
const router = express.Router();
const { Joke } = require('../schemas');


//getting random joke
router.get('/', async function(req, res, next) {
  try {
    const count = await Joke.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No jokes found' });
    }
    
    const random = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(random);
    
    res.json(joke);
  } catch (err) {
    console.error('Error fetching random joke:', err);
    res.status(500).json({ message: 'Error fetching random joke' });
  }
});

//saving voting for joke
router.post('/:id', async function(req, res, next) {
  try {
    const joke = await Joke.findOne({ id: req.params.id });
    
    if (!joke) {
      return res.status(404).json({ message: 'Joke not found' });
    }

    const voteValue = req.body.value;
    const voteLabel = req.body.label;

    const existingVote = joke.votes.find(vote => vote.label === voteLabel);
    if (existingVote) {
      existingVote.value += voteValue;
    } else {
      joke.votes.push({ value: voteValue, label: voteLabel });
    }

    await joke.save();
    
    res.json(joke);
  } catch (err) {
    console.error('Error updating joke votes:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Wromg joke ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;