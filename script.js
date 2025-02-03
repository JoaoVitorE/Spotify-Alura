// Capiturando a digitação:
const searchInput = document.getElementById('searc-input');

// Criando o espaço para mostar os artistas
const resultArtist = document.getElementById("result-artist");

// Criando o espaço para mostrar as playlists
const resultPlaylist = document.getElementById('result-playlists');

// Criando o consumo de API
function requestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

// Criando o flux para mostrar os resultados da busca
function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        // Capiturando e mostrando o nome que vem da API
        artistName.innerText = element.name;
        // Capiturando e mostrando imagem que vem da API
        artistImage.src = element.urlImg;
    });
    
    // Mostrando os resultados
    resultArtist.classList.remove('hidden');
}

// Criando o evento de mostar os artistas
document.addEventListener('input', function () {
    // Transformando a busca em letras minusculas
    const searchTerm = searchInput.value.toLowerCase();
    // === significa igual e do mesmo tipo
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
})
