const button = document.getElementById('myButton');
const input = document.getElementById('myInput');
const resultsElement = document.getElementById('results');

button.addEventListener('click', () => {
  const searchText = input.value;

  const apiUrl = `https://openlibrary.org/subjects/${encodeURIComponent(searchText)}.json`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const results = data.works.map(doc => {
        const title = doc.title || 'Title unknown';
        const authors = doc.author_name ? doc.author_name.join(', ') : 'Author unknown';
        return `
          <div class="result">
            <h3>${title}</h3>
            <p>Autore: ${authors}</p>
            <button class="view-description-btn" data-key="${doc.key}">View details</button>
          </div>
        `;
      }).join('');
      resultsElement.innerHTML = results;
    })
    .catch(error => {
      console.error(error);
    });
});

resultsElement.addEventListener('click', event => {
  if (event.target.classList.contains('view-description-btn')) {
    const bookKey = event.target.dataset.key;

    const descriptionApiUrl = `https://openlibrary.org${bookKey}.json`;

    fetch(descriptionApiUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.description || 'No details';
        console.log(description);
      })
      .catch(error => {
        console.error(error);
      });
  }
});




