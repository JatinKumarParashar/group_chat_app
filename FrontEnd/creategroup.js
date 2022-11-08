const token=localStorage.getItem('token');
const port = 'http:localhost:3000';
const groups=document.getElementById('mygroups');


function createGroup(event){
   // event.preventDefault();
    const groupName=event.target.groupname.value;
    const obj={
        groupName
    }
    console.log(obj)
    axios.post(`${port}/group/createGroup`,obj,{ headers: { 'Authorization': token } })
    .then(response=>{
        console.log(response);
    })
    .catch(err=>{
        console.log(err);
        })

}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`${port}/group/getGroups`,{ headers: { 'Authorization': token } })
    .then(result=>{
        for (let i = 0; i < result.data.length; i++) {
            showGroupsOnScreen(result.data[i]);
            
        }
    })
})

function showGroupsOnScreen(data){
    const content=`<button onclick="chat(${data.id})">${data.groupName}</button><br><br>`;
    groups.innerHTML+=content;
}

function chat(groupId){
    console.log(groupId);
    localStorage.setItem('groupId',groupId);
    localStorage.removeItem('oldMessage');
    window.location.href='C:/Users/jaykp/Desktop/group_chat_app/FrontEnd/chat.html'
}