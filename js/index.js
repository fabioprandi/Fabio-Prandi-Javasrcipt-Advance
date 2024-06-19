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

    const results = data.works.map(doc => {
      const title = doc.title || 'Titolo sconosciuto';
      const authors = doc.author_name ? doc.author_name.join(', ') : 'Autore sconosciuto';
      const date = doc.publication_date || 'Data sconosciuta';
      return `
        <div class="result">
          <h3>${title}</h3>
          <p>Autore: ${authors}</p>
          <p>Data: ${date}</p>
          <button class="view-description-btn" data-key="${doc.key}">Visualizza dettagli</button>
        </div>
      `;
    }).join('');
    resultsElement.innerHTML = results;
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




