import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref , push , onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://jabber-37173-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const chatsInDB = ref(database, "chats")

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
    scrollDown()
})



jabBtnEl.addEventListener('click',(e) => {
    if(messageInputEl.value){
        let item = {
            username: `${user}`,
            chat:`${messageInputEl.value}`
        }
        push(chatsInDB, item)
        

        scrollDown()
    }

    clearInputField(messageInputEl)
})


onValue(chatsInDB , (snapshot) => {
    
        let itemsArray = Object.entries(snapshot.val())
        let feedHtml = ''

        for(let i = 0 ; i < itemsArray.length ; i++){
            let currentItem = itemsArray[i]
            let currentItemValue = currentItem[1]

            feedHtml += getFeed(currentItemValue)
        }
        render(feedHtml)
    
    
})  


function getFeed(item){
    return `<div class="message-chat">
                <p>${item.chat}</p>
                <h4>@${item.username}</h4>
            </div>`
}

function render(feedHtml){
    chatsEl.innerHTML = feedHtml
}


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



function scrollDown(){
    chatsEl.scrollTop = chatsEl.scrollHeight;
}