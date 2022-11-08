const token = localStorage.getItem('token');
const port = 'http:localhost:3000';
const messages=document.getElementById('allmessage');
const groupId=localStorage.getItem('groupId');
const adduser=document.getElementById('adduser');



function save(event) {
    event.preventDefault();
    const message = event.target.message.value;
    const obj = {
        message
    }
    console.log(obj);
    axios.post(`${port}/chatApp/post-message?groupId=${groupId}`, obj, { headers: { 'Authorization': token } })
        .then(response => {
            //console.log(response);
            //showMessageOnScreen(obj);

        }).catch(err => {
            console.log(err);
        })
}


	
	window.addEventListener('DOMContentLoaded', () => {
    axios.get(`${port}/chatApp/get-users?groupId=${groupId}`,{ headers: { 'Authorization': token } })
    .then(result=>{
        console.log(result.data[0].isAdmin);
        if(!result.data[0].isAdmin){
            adduser.style.display='none';
        }
    })

	  //setInterval(() => {
           messages.innerHTML='';
        var oldMessage=localStorage.getItem('oldMessage');
        var lastMessage=-1;
      
         var oldMessageParse=JSON.parse(oldMessage)||[];
       
       // console.log('oldMessage in LocalStorage',oldMessageParse);
        if(oldMessageParse){
            for(let i=0;i<oldMessageParse.length;i++){
                showMessageOnScreen(oldMessageParse[i]);
                lastMessage=oldMessageParse[i].id;
            }
        }
      //  console.log('lastMessage id',lastMessage);
	 axios.get(`${port}/chatApp/get-message?lastMessage=${lastMessage}&groupId=${groupId}`, { headers: { 'Authorization': token } })
	        .then(result => {
	            //console.log('frontEnd/chat.js line 43 ', result.data);
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
//}, 1000);
	})

function showMessageOnScreen(data) {
   // console.log(messages)
    const newMessage=` <li class="message-content">${data.username||'you'} : ${data.message} </li>`;
    messages.innerHTML+=newMessage;
}


function createGroup(event){
    event.preventDefault();
    window.location.href='C:/Users/jaykp/Desktop/group_chat_app/FrontEnd/creategroup.html';
}



function addUser(event){
    window.location.href='C:/Users/jaykp/Desktop/group_chat_app/FrontEnd/addUser.html';
}

function removeUser(event){
    window.location.href='C:/Users/jaykp/Desktop/group_chat_app/FrontEnd/addUser.html';

}