document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('find-synonyms');
  const wordInput = document.getElementById('word-input');
  const resultsContainer = document.getElementById('results-container');

  searchButton.addEventListener('click', function() {
    const word = wordInput.value.trim();
    if (word) {
      fetchSynonyms(word);
    } else {
      resultsContainer.textContent = 'Please enter a word.';
    }
  });

  function fetchSynonyms(word) {
    const url = `https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus?word=${encodeURIComponent(word)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b123db0995mshf84a7c69c015edfp122abdjsn25aa706cc0d0',
        'X-RapidAPI-Host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch synonyms');
        }
      })
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        resultsContainer.textContent = error.message;
      });
  }  

  function displayResults(data) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Display new results
    if (data && data.synonyms && data.synonyms.length > 0) {
      const list = document.createElement('ul');
      data.synonyms.forEach(synonym => {
        const listItem = document.createElement('li');
        listItem.textContent = synonym;
        list.appendChild(listItem);
      });
      resultsContainer.appendChild(list);
    } else {
      resultsContainer.textContent = 'No synonyms found.';
    }
  }
});
