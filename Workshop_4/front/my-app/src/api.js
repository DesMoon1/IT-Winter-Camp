const BASE_URL = 'http://localhost:3000/joke';

// 1. GET a random joke
async function getRandomJoke() {
  try {
    // Using fetch
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const joke = await response.json();
    console.log('Random joke:', joke);
    return joke;
  } catch (error) {
    console.error('Error fetching random joke:', error);
  }
}

//voting for joke
async function voteForJoke(jokeId, label, value = 1) {
  try {
    const response = await fetch(`${BASE_URL}/${jokeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ label, value })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const updatedJoke = await response.json();
    console.log('Vote submitted successfully:', updatedJoke);
    return updatedJoke;
  } catch (error) {
    console.error('Error submitting vote:', error);
  }
}