
async function loadBreeds() {
    const res = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await res.json();

    const alphabetContainer = document.getElementById('alphabet');
    const breedList = document.getElementById('breedList');

    // Create A–Z buttons
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(letter => {
      const btn = document.createElement('span');
      btn.textContent = letter;
      btn.classList.add('letter');
      btn.addEventListener('click', () => showBreeds(letter));
      alphabetContainer.appendChild(btn);
    });

    function showBreeds(letter) {
      const filtered = breeds.filter(b => b.name.startsWith(letter));
      breedList.innerHTML = '';

      if (filtered.length === 0) {
        breedList.innerHTML = `<li>No breeds found for "${letter}"</li>`;
        return;
      }

      filtered.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed.name;
        breedList.appendChild(li);
      });
    }
  }

  loadBreeds();
