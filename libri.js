    const button = document.getElementById('myButton');
    const input = document.getElementById('myInput');
    const resultsElement = document.getElementById('results');

    button.addEventListener('click', () => {
    const searchText = input.value;

      const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const results = data.docs.map(doc => {
            const title = doc.title || 'Titolo non disponibile';
            const author = doc.author ? doc.author.map(a => a.name).join(', ') : 'Autore non disponibile';
            const coverUrl = doc.cover ? doc.cover.small : 'https://example.com/default-cover.jpg';
            return `
              <div class="result">
                <h3>${title}</h3>
                <p>Autore: ${author}</p>
                <img src="${coverUrl}" alt="${title}">
              </div>
            `;
          }).join('');
          resultsElement.innerHTML = results;
        })
        .catch(error => {
          console.error(error);
        });
    });
//pop-up

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('result')) {
    const title = event.target.querySelector('h3').textContent;
    const author = event.target.querySelector('p:nth-child(2)').textContent;
    const details = event.target.querySelector('p:nth-child(3)').textContent;

    const detailsPopup = document.getElementById('detailsPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupAuthor = document.getElementById('popupAuthor');
    const popupDetails = document.getElementById('popupDetails');

    popupTitle.textContent = title;
    popupAuthor.textContent = author;
    popupDetails.textContent = details || 'No details available';

    detailsPopup.style.display = 'block';
  }
});
document.addEventListener('click', function(event) {
  const detailsPopup = document.getElementById('detailsPopup');
  if (event.target !== detailsPopup && !detailsPopup.contains(event.target)) {
    detailsPopup.style.display = 'none';
  }
});





