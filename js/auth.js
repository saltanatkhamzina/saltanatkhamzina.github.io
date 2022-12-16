const form = document.querySelector('form')

function authWithEmailAndPassword(email, password) {
    var db = JSON.parse(localStorage.getItem('db'))
    if (!db) db = {}

    if (email in db){
        if (db[email]['password'] == password){
            sessionStorage.setItem('email', email)
            alert('Вы успешно авторизованы!')
            window.location.href = '/'
        }
        else {
            alert('Вы ввели неверный пароль!')
        }
    }
    else {
        alert('Введенной вами почты не существует!')
    }
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
    btn.disabled = false
}

form.addEventListener('submit', authFormHandler, {once: true})