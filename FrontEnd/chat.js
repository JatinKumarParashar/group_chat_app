const token = localStorage.getItem('token');
const port = 'http:localhost:3000';



function save(event) {
    event.preventDefault();
    const message = event.target.message.value;
    const obj = {
        message
    }
    console.log(obj);
    axios.post(`${port}/chatApp/post-message`, obj, { headers: { 'Authorization': token } })
        .then(response => {
            console.log(response);
            showMessageOnScreen(obj);

        }).catch(err => {
            console.log(err);
        })
}


window.addEventListener('DOMContentLoaded', () => {
    axios.get(`${port}/chatApp/get-message`, { headers: { 'Authorization': token } })
        .then(result => {
            console.log('frontEnd/chat.js line 25 ', result.data);
            for (let i = 0; i < result.data.length; i++) {
                showMessageOnScreen(result.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        })
})

function showMessageOnScreen(data) {
    const messages=document.getElementById('allmessage');
   // console.log(messages)
    const newMessage=` <li class="message-content">${data.username||'you'} : ${data.message} </li>`;
    messages.innerHTML+=newMessage;
}
