async function loadBreeds() {
    try {
        // const res = await fetch('http://localhost:2000/api/breeds');
        const res = await fetch('/api/breeds');
        const breeds = await res.json();
        console.log('First breed:', breeds[0]);

        const alphabetContainer = document.getElementById('alphabet');
        const breedList = document.getElementById('breedList');
        const searchBar = document.getElementById('searchBar');
        const modal = document.getElementById("breedModal");
        const modalBody = document.getElementById("modalBody");
        const closeBtn = document.querySelector(".close-btn");

        // Create A–Z buttons
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        alphabet.forEach(letter => {
            const btn = document.createElement('span');
            btn.textContent = letter;
            btn.classList.add('letter');
            btn.addEventListener('click', () => showBreedsByLetter(letter));
            alphabetContainer.appendChild(btn);
        });

        // Search functionality
        searchBar.addEventListener('input', e => {
            const query = e.target.value.toLowerCase();
            const filtered = breeds.filter(breed =>
                breed.name.toLowerCase().includes(query)
            );
            renderList(filtered);
        });

        // Show breeds by letter
        function showBreedsByLetter(letter) {
            const filtered = breeds.filter(b => b.name.startsWith(letter));
            renderList(filtered);
        }

        // Show breed details in modal
        async function showBreedDetails(breedId) {
            try {
                modal.style.display = "flex";
                modalBody.innerHTML = '<p>Loading...</p>';

                // const res = await fetch(`http://localhost:2000/api/breeds/${breedId}`);
                const res = await fetch(`/api/breeds/${breedId}`);
                const breed = await res.json();

                modalBody.innerHTML = `
                    <h2>${breed.name}</h2>
                    <img src="${breed.image?.url || 'https://via.placeholder.com/300?text=🐶'}" 
                         alt="${breed.name}"
                         style="max-width: 100%; height: auto;">
                    <p><strong>Temperament:</strong> ${breed.temperament || "N/A"}</p>
                    <p><strong>Weight:</strong> ${breed.weight.metric} kg</p>
                    <p><strong>Height:</strong> ${breed.height.metric} cm</p>
                    <p><strong>Life span:</strong> ${breed.life_span}</p>
                `;
            } catch (error) {
                console.error('Error:', error);
                modalBody.innerHTML = '<p>Error loading breed details</p>';
            }
        }

        // Modal close handlers
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        modal.addEventListener("click", e => {
            if (e.target === modal) modal.style.display = "none";
        });

        // Render breed list
        function renderList(items) {
            breedList.innerHTML = "";
            if (items.length === 0) {
                breedList.innerHTML = "<li>No breeds found</li>";
                return;
            }

            items.forEach(breed => {
                const li = document.createElement("li");
                const img = document.createElement("img");
                img.classList.add("breed-image");
                img.src = breed.image?.url || "https://via.placeholder.com/60?text=🐶";
                img.alt = breed.name;

                const name = document.createElement("span");
                name.classList.add("breed-name");
                name.textContent = breed.name;

                li.appendChild(img);
                li.appendChild(name);
                li.addEventListener("click", () => showBreedDetails(breed.id));
                breedList.appendChild(li);
            });
        }

        // Show all breeds by default
        renderList(breeds);

    } catch (error) {
        console.error('Error loading breeds:', error);
    }
}

// Start the app
loadBreeds();
