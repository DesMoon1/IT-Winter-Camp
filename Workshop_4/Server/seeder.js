const { Joke } = require('./schemas');

async function seedJokes() {
  try {
    const count = await Joke.countDocuments();
    if (count === 0) {
      const initialJokes = [
        { 
          id: '1',
          question: 'Why did the developer go broke?',
          answer: 'Because he used up all his cache!',
          votes: [
            { value: 0, label: '😂' },
            { value: 0, label: '👍' },
            { value: 0, label: '❤️' }
          ],
          availableVotes: ['😂', '👍', '❤️']
        },
        { 
          id: '2',
          question: 'Why do programmers prefer dark mode?',
          answer: 'Because light attracts bugs!',
          votes: [
            { value: 0, label: '😂' },
            { value: 0, label: '👍' },
            { value: 0, label: '❤️' }
          ],
          availableVotes: ['😂', '👍', '❤️']
        },
        {
          id: '3',
          question: 'What\'s the object-oriented way to become wealthy?',
          answer: 'Inheritance.',
          votes: [
            { value: 0, label: '😂' },
            { value: 0, label: '👍' },
            { value: 0, label: '❤️' }
          ],
          availableVotes: ['😂', '👍', '❤️']
        }
      ];
      await Joke.insertMany(initialJokes);
      console.log('Seed jokes have been added to the database');
    }
  } catch (err) {
    console.error('Error seeding jokes:', err);
  }
}

module.exports = { seedJokes };