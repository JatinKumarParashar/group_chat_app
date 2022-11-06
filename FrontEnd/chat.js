const token = localStorage.getItem('token');
const port = 'http:localhost:3000';
const messages=document.getElementById('allmessage');



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
            //showMessageOnScreen(obj);

        }).catch(err => {
            console.log(err);
        })
}


	
	window.addEventListener('DOMContentLoaded', () => {
	   setInterval(() => {
           messages.innerHTML='';
        var oldMessage=localStorage.getItem('oldMessage');
        var lastMessage=-1;
        var oldMessageParse=JSON.parse(oldMessage);
        console.log('oldMessage in LocalStorage',oldMessageParse);
        if(oldMessageParse){
            for(let i=0;i<oldMessageParse.length;i++){
                showMessageOnScreen(oldMessageParse[i]);

                lastMessage=oldMessageParse[i].id;
            }
        }
        console.log('lastMessage id',lastMessage);
	 axios.get(`${port}/chatApp/get-message?lastMessage=${lastMessage}`, { headers: { 'Authorization': token } })
	        .then(result => {
	            console.log('frontEnd/chat.js line 43 ', result.data);
                const newMessage=result.data;
                oldMessageParse=[...oldMessageParse,...newMessage];
                const oldMessageStringify=JSON.stringify(oldMessageParse);
                localStorage.setItem('oldMessage',oldMessageStringify);
	            for (let i = 0; i < result.data.length; i++) {
	                showMessageOnScreen(result.data[i]);
	            }
	        })
	        .catch(err => {
	            console.log(err);
	        })
}, 1000);
	})

function showMessageOnScreen(data) {
   // console.log(messages)
    const newMessage=` <li class="message-content">${data.username||'you'} : ${data.message} </li>`;
    messages.innerHTML+=newMessage;
}
