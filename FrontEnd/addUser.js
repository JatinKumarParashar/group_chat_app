const groupId = localStorage.getItem('groupId');
const token = localStorage.getItem('token');
const port = 'http:localhost:3000';
const users = document.getElementById('users');
function addUser(event) {
    event.preventDefault();
    const obj = {
        username: event.target.username.value
    }
    axios.post(`${port}/group/add-user?groupId=${groupId}`, obj, { headers: { 'Authorization': token } })
        .then(result => {
            console.log(result);
            alert('User has been added to this Group');
        })
        .catch(response => {
            alert(response)

        })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get(`${port}/group/getAllUsers?groupId=${groupId}`, { headers: { 'Authorization': token } })
        .then(result => {
            console.log(result)
            for (let i = 0; i < result.data.users.length; i++) {
                showUserOnScreen(result.data.users[i]);
            }
        })
})

function showUserOnScreen(data) {
    const content = `<li>${data.username}</li><button onclick="removeUser(${data.id},${groupId})">Remove</button><button onclick="adminUser(${data.id},${groupId})">MakeAdmin</button><button onclick="removeAdminUser(${data.id},${groupId})">Remove Admin</button><br>`;
    users.innerHTML += content;
}

function removeUser(userId,groupid){
    const obj={

    }
    console.log(token);
     axios.post(`${port}/group/removeUser?userId=${userId}&groupId=${groupid}`, obj, { headers: { 'Authorization': token } })
     .then(result=>{
        console.log(result)
     })
}


function adminUser(userId,groupid){
    const obj={
isAdmin:true
    }
    console.log(token);
     axios.post(`${port}/group/makeUserAdmin?userId=${userId}&groupId=${groupid}`, obj, { headers: { 'Authorization': token } })
     .then(result=>{
        console.log(result)
     })
}


function removeAdminUser(userId,groupid){
    const obj={
isAdmin:false
    }
    console.log(token);
     axios.post(`${port}/group/makeUserAdmin?userId=${userId}&groupId=${groupid}`, obj, { headers: { 'Authorization': token } })
     .then(result=>{
        console.log(result)
     })
}