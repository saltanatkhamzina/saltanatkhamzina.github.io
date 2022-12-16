const form = document.querySelector('form')

function signUp(name, surname, email, password) {
    var db = JSON.parse(localStorage.getItem('db')) //
    if (!db) db = {}

    if (!(email in db)){
        db[email] = {'name': name, 'surname': surname, 'password': password}
        sessionStorage.setItem('email', email)
        alert('Вы успешно зарегистрированы!')
        window.location.href = '/'
    }
    else {
        alert('Введенная вами почта уже использована!')
    }

    localStorage.setItem('db', JSON.stringify(db))
}

function signUpFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const name = event.target.querySelector('#name').value
    const surname = event.target.querySelector('#surname').value
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true
    signUp(name, surname, email, password)
}

form.addEventListener('submit', signUpFormHandler, {once: true})