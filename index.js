let loginFormEl = document.getElementById('login-form')
let usernameEl = document.getElementById('username')
let loggedOutViewEl = document.getElementById('logged-out-view')
let loggedInViewEl = document.getElementById('logged-in-view')
let messageInputEl = document.getElementById('message-input')
let jabBtnEl = document.getElementById('jabBtn')
let chatsEl = document.getElementById('chats')
let user = ''

loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const loginFormData = new FormData(loginFormEl)

    const name = loginFormData.get('username')
    user = name
    console.log(`${name} is my username`)

    clearInputField(usernameEl)

    showLoggedInView()
})



jabBtnEl.addEventListener('click',(e) => {
    if(messageInputEl.value){
        chatsEl.innerHTML += `<div class="message-chat">
                                <p>${messageInputEl.value}</p>
                                <h4>@${user}</h4>
                             </div>`

       chatsEl.scrollTop = chatsEl.scrollHeight;
    }

    clearInputField(messageInputEl)
})


function clearInputField(field){
    field.value = ""
}

function showLoggedOutView(){
    hideView(loggedInViewEl)
    showView(loggedOutViewEl)
}

function showLoggedInView(){
    hideView(loggedOutViewEl)
    showView(loggedInViewEl)
}

function showView(view){
    view.style.display = 'block'
}

function hideView(view){
    view.style.display = 'none'
}
