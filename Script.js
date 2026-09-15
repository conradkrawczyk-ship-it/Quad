// Funkcja pobierająca świeże dane z pliku data.json
async function loadData() {
  try {
    // timestamp zapobiega zapisywaniu pliku w pamięci podręcznej (cache)
    const response = await fetch(`data.json?timestamp=${new Date().getTime()}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Błąd pobierania: ${response.status}`);
    }

    const data = await response.json();

    // Wstawienie pobranych danych do elementów HTML o odpowiednich ID
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.innerHTML = `
        <h2>${data.tytul}</h2>
        <p>${data.wiadomosc}</p>
      `;
    }
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
  }
}

// Uruchomienie funkcji po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', loadData);
