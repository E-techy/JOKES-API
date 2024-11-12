// Select DOM elements
const getJokesTab = document.getElementById('getJokesTab');
const addJokesTab = document.getElementById('addJokesTab');
const textarea = document.querySelector('.textarea');
const sendButton = document.querySelector('.search-button');
const urlInput = document.querySelector('.url-input');
const responseContainer = document.querySelector('.response-container');

// By default, set the "Get Jokes" as active, and hiding the textarea used to add jokes
getJokesTab.classList.add('active');
textarea.classList.add('hidden');

// Event listeners for tab clicks on "Get Jokes" tab
getJokesTab.addEventListener('click', () => {
  getJokesTab.classList.add('active');
  addJokesTab.classList.remove('active');
  textarea.classList.add('hidden');
  textarea.classList.remove('show');
});

// Event listeners for tab clicks on "Add Jokes" tab
addJokesTab.addEventListener('click', () => {
  addJokesTab.classList.add('active');
  getJokesTab.classList.remove('active');
  textarea.classList.remove('hidden');
  textarea.classList.add('show');
});

// Function to validate URL for the Get Jokes tab to see whether it contains the LANGUAGE and NO_OF_JOKES query params
function validateGetJokesUrl(url) {
  const urlPattern = /^https?:\/\/[\w.-]+(\.[\w\.-]+)*(:\d+)?(\/[\w\.-]*)*(\?LANGUAGE=[a-zA-Z]+&NO_OF_JOKES=(\d+))$/;
  const match = url.match(urlPattern);
  if (!match) return false;

  // Validate NO_OF_JOKES parameter
  const noOfJokes = parseInt(match[5], 10);
  return noOfJokes >= 1 && noOfJokes <= 500;
}

// Function to validate URL for the Add Jokes tab to see whether it contains the LANGUAGE query params
function validateAddJokesUrl(url) {
  const urlPattern = /^https?:\/\/[\w.-]+(\.[\w\.-]+)*(:\d+)?(\/[\w\.-]*)*(\?LANGUAGE=[a-zA-Z]+)$/;
  return urlPattern.test(url);
}

// Function to validate JSON format in the textarea for the Add Jokes tab which will allow the clients to send only valid json data in the 
// proper format 
function validateJokesJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return (
      data &&
      Array.isArray(data.jokes) &&
      data.jokes.every(joke => typeof joke === 'string')
    );
  } catch (e) {
    return false;
  }
}

// Function to display jokes in the response container
function displayJokes(jokes) {
  let jokesHtml = '<h3>RECEIVED JOKES:</h3>';
  jokes.forEach((joke, index) => {
    jokesHtml += `<p>Joke ${index + 1}: ${joke}</p>`;
  });
  responseContainer.insertAdjacentHTML('beforeend', jokesHtml);
}

// Function to handle Get Jokes request
function handleGetJokes() {
  const url = urlInput.value.trim();

  // Clear previous response
  responseContainer.innerHTML = '';

  // Validate the URL
  if (!validateGetJokesUrl(url)) {
    alert('Invalid URL. Ensure it contains LANGUAGE (letters only) and NO_OF_JOKES (1-500) query parameters.');
    return;
  }

  // Send GET request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract jokes from response array
      const jokes = data.map(jokeObj => jokeObj.jokes);
      displayJokes(jokes);
    })
    .catch(error => {
      console.error('Error fetching jokes:', error);
      alert('Failed to fetch jokes. Try again later.');
    });
}

// Function to handle Add Jokes request
function handleAddJokes() {
  const url = urlInput.value.trim();
  const jokesText = textarea.value.trim();

  // Clear previous response
  responseContainer.innerHTML = '';

  // Validate URL and JSON format
  if (!validateAddJokesUrl(url)) {
    alert('Invalid URL. Ensure it contains the LANGUAGE query parameter with letters only.');
    return;
  }
  if (!validateJokesJson(jokesText)) {
    alert('Invalid JSON format in jokes text area. Ensure it matches the required format.');
    return;
  }

  const data = JSON.parse(jokesText);

  // Send POST request
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 201) {
        responseContainer.insertAdjacentHTML('beforeend', '<p>JOKES ADDED SUCCESSFULLY</p>');
      } else {
        responseContainer.insertAdjacentHTML('beforeend', '<p>Jokes not added. Try again after some time.</p>');
      }
    })
    .catch(error => {
      console.error('Error adding jokes:', error);
      alert('Failed to add jokes. Try again later.');
    });
}

// Event listeners
sendButton.addEventListener('click', () => {
  if (getJokesTab.classList.contains('active')) {
    handleGetJokes();
  } else if (addJokesTab.classList.contains('active')) {
    handleAddJokes();
  }
});
