const section = document.getElementById('section')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const db = JSON.parse(localStorage.getItem('db'))
const email = sessionStorage.getItem('email')

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(pokemon => {
        section.innerHTML = `
        <div class="container px-4 px-lg-5 my-3">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-5"><img class="card-img-top mb-5 mb-md-0" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="..." /></div>
                <div class="col-md-7">
                    <div class="mb-1">#${pokemon.id
                        .toString()
                        .padStart(3, '0')}</div>
                    <h1 class="display-5 fw-bolder">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
                    <p class="lead">Базовый опыт - ${pokemon.base_experience}, Рост - ${pokemon.height}, Вес - ${pokemon.weight}.\nОсновная способоность - ${pokemon.abilities[0].ability.name.toUpperCase()}</p>
                    <div class="d-flex">
                        <a class="btn btn-outline-dark flex-shrink-0" href="/">
                            <i class="bi-cart-fill me-1"></i>
                            На главную
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
    })
}

function logOut() {
    sessionStorage.clear()
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
    fetchPokemon(id)
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