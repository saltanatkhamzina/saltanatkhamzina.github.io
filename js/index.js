const links = document.getElementById('links')
const db = JSON.parse(localStorage.getItem('db'))
const email = sessionStorage.getItem('email')
const cards = document.querySelector('.row')
cards.innerHTML = ''

function logOut() {
    sessionStorage.clear()
}

function fetchPokemons(count) {
    const offset = Math.floor(Math.random() * 500)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${offset}`)
    .then(response => response.json())
    .then(allpokemon => {
        allpokemon.results.forEach(function(poke){
            fetch(poke.url)
            .then(response => response.json())
            .then(pokemon => {
                cards.innerHTML += `
                <div class="col justify-content-center">
                    <div class="card text-bg-dark" style="width: 100%;">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} - ${pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name}</h5>
                    <p class="card-text"></p>
                    <a href="/pokemon.html?id=${pokemon.id}" class="btn btn-outline-light">Детали</a>
                    </div>
                    </div>
                </div>
                `
            })
            
        })
    })
}

if(email) {
    const name = `${db[email]['name']} ${db[email]['surname']}`
    links.innerHTML = `
    <li class="nav-item">
        <a class="nav-link active" href="#">${name}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="" id="logout">Выйти</a>
    </li>
    `
    fetchPokemons(10)
}
else {
    links.innerHTML = `
    <li class="nav-item">
        <a class="nav-link active" href="/auth.html">Войти</a>
    </li>
    <li class="nav-item">
        <a class="nav-link active" href="/signup.html">Зарегистрироваться</a>
    </li>
    `
}

const button = document.getElementById('logout')
button.addEventListener('click', logOut)

