const API_KEY = 'ab10a528cc3c89381a03a794d32cbd82';
const isFavoritesPage = window.location.pathname.includes('favorite.html');

function fetchAnimeByCategory(category, sliderId) {
    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${category}&sort_by=popularity.desc&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const slider = document.getElementById(sliderId);
        data.results.forEach(anime => {
            const isFavorite = isAnimeFavorite(anime);
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');
            animeCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${anime.poster_path}" alt="${anime.name}">
                <h3>${anime.name}</h3>
                <i class="fa-heart ${isFavorite ? 'fas' : 'far'} toggle-favorite" data-anime-id="${anime.id}"></i>
            `;
            slider.appendChild(animeCard);
        });
    });
}

function isAnimeFavorite(anime) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(favAnime => favAnime.id === anime.id);
}

function addAnimeToFavorites(anime) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(anime);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeAnimeFromFavorites(anime) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favAnime => favAnime.id !== anime.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-favorite')) {
        const animeId = parseInt(e.target.getAttribute('data-anime-id'));

        const allAnimeElements = isFavoritesPage ? Array.from(document.getElementById('favoritesContainer').children) : [].concat(...document.querySelectorAll('.anime-slider')).map(slider => Array.from(slider.children)).flat();
        
        const allAnime = allAnimeElements.map(card => {
            return {
                id: parseInt(card.querySelector('.fa-heart').getAttribute('data-anime-id')),
                name: card.querySelector('h3').innerText,
                poster_path: card.querySelector('img').getAttribute('src').split('/').pop()
            };
        });
        
        const anime = allAnime.find(a => a.id === animeId);

        if (isAnimeFavorite(anime)) {
            removeAnimeFromFavorites(anime);
            e.target.classList.remove('fas');
            e.target.classList.add('far');

            // Si nous sommes sur la page favorite.html, supprimez également la carte d'anime de la vue.
            if (isFavoritesPage) {
                const cardToRemove = e.target.closest('.anime-card');
                cardToRemove.remove();
            }
        } else {
            addAnimeToFavorites(anime);
            e.target.classList.remove('far');
            e.target.classList.add('fas');
        }
    }
});

if (isFavoritesPage) {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favorites.forEach(anime => {
        const isFavorite = isAnimeFavorite(anime);
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${anime.poster_path}" alt="${anime.name}">
            <h3>${anime.name}</h3>
            <i class="fa-heart ${isFavorite ? 'fas' : 'far'} toggle-favorite" data-anime-id="${anime.id}"></i>
        `;
        favoritesContainer.appendChild(animeCard);
    });
} else {
    // Sinon, fetch les animes pour la page principale
    window.onload = () => {
        fetchAnimeByCategory('10759', 'actionSlider');
        fetchAnimeByCategory('10762', 'adventureSlider'); 
        fetchAnimeByCategory('10765', 'comedySlider'); 
    };
}
