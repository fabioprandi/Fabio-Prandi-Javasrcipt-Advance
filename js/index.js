const button = document.getElementById('myButton');
const input = document.getElementById('myInput');
const resultsElement = document.getElementById('results');

button.addEventListener('click', async () => {
  try {
    const searchText = input.value;

    const apiUrl = `https://openlibrary.org/subjects/${encodeURIComponent(searchText)}.json`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Errore nella richiesta di rete');
    }

    const data = await response.json();

    const results = await Promise.all(data.works.map(async (doc) => {
      const title = doc.title || 'Titolo sconosciuto';
      const authors = doc.authors ? await Promise.all(doc.authors.map(async (author) => {
          const authorResponse = await fetch(`https://openlibrary.org${author.key}.json`);
          const authorData = await authorResponse.json();
          return authorData.name;
      })) : ['Autore sconosciuto'];
  
      return `
          <div class="result">
              <h3>${title}</h3>
              <p>Autore: ${authors.join(', ')}</p>
              <button class="view-description-btn" data-key="${doc.key}">Visualizza dettagli</button>
          </div>
      `;
  }));
  resultsElement.innerHTML = results.join('');
} catch (error) {
    console.error(error);
}
});

resultsElement.addEventListener('click', async (event) => {
  if (event.target.classList.contains('view-description-btn')) {
    try {
      const bookKey = event.target.dataset.key;

      const descriptionApiUrl = `https://openlibrary.org${bookKey}.json`;

      const response = await fetch(descriptionApiUrl);
      if (!response.ok) {
        throw new Error('Errore nella richiesta di rete');
      }

      const data = await response.json();

      const description = data.description || 'Nessun dettaglio';
      console.log(description);
    } catch (error) {
      console.error(error);
    }
  }
});