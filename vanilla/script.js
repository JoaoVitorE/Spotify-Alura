// Capiturando a digitação:
const searchInput = document.getElementById('search-input');

// Criando o espaço para mostar os artistas
const resultArtist = document.getElementById("result-artist");

// Criando o espaço para mostrar as playlists
const resultPlaylist = document.getElementById('result-playlists');

// Criando o consumo de API
function requestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
}

// Criando o fluxo para voltar a pagina inicial
function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    // Definindo o local dos elementos
    const gridContainer = document.querySelector('.grid-container');
    // Limpando os resultados anteriores
    gridContainer.innerHTML = '';

    // Criando o filtro
    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm) );

    // Criando o card para cada artista
    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;
        gridContainer.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}

// Criando o evento de mostar os artistas
document.addEventListener('input', function () {
    // Transformando a busca em letras minusculas
    // Trim remove espaços vazios na busca
    const searchTerm = searchInput.value.toLowerCase().trim();
    // === significa igual e do mesmo tipo
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
})
