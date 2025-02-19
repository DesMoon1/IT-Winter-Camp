import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  const fetchRandomJoke = async () => {
    try {
      const response = await axios.get('http://localhost:3000/joke');
      setJoke(response.data);
      setError('');
    } catch (err) {
      setError('Cannot receive');
    }
  };

  const handleVote = async (label) => {
    if (!joke) return;

    try {
      const response = await axios.post(`http://localhost:3000/joke/${joke.id}`, {
        value: 1,
        label: label
      });
      setJoke(response.data); 
    } catch (err) {
      setError('Voting error');
    }
  };

  return (
    <div className="app">
      <h1>Jokes for iT Camp</h1>
      {error && <p className="error">{error}</p>}
      {joke ? (
        <div className="joke">
          <p>{joke.question}</p>
          <p>{joke.answer}</p>
          
          <div className="votes">
            <div>
              {['😂', '👍', '❤️'].map((emoji) => {
                const count = joke.votes.find(vote => vote.label === emoji)?.value || 0;
                return (
                  <button key={emoji} onClick={() => handleVote(emoji)}>
                    {emoji} {count}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={fetchRandomJoke}>некст</button>
        </div>
      ) : (
        <p>Empty....</p>
      )}
    </div>
  );
}

export default App;
