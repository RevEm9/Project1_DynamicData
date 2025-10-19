async function loadBreeds() {
  const res = await fetch('https://api.thedogapi.com/v1/breeds');
  const breeds = await res.json();

  const alphabetContainer = document.getElementById('alphabet');
  const breedList = document.getElementById('breedList');
  const searchBar = document.getElementById('searchBar');

  // 🅰️ Create A–Z buttons
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphabet.forEach(letter => {
    const btn = document.createElement('span');
    btn.textContent = letter;
    btn.classList.add('letter');
    btn.addEventListener('click', () => showBreedsByLetter(letter));
    alphabetContainer.appendChild(btn);
  });

  // 🐶 Show breeds starting with a specific letter
  function showBreedsByLetter(letter) {
    const filtered = breeds.filter(b => b.name.startsWith(letter));
    renderList(filtered);
  }

  // 🔍 Search functionality
  searchBar.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = breeds.filter(breed =>
      breed.name.toLowerCase().includes(query)
    );
    renderList(filtered);
  });

  // 🧩 Render the breed list
  function renderList(items) {
    breedList.innerHTML = '';
    if (items.length === 0) {
      breedList.innerHTML = '<li>No breeds found</li>';
      return;
    }
    items.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed.name;
      breedList.appendChild(li);
    });
  }

  // Show all breeds by default
  renderList(breeds);
}

loadBreeds();
