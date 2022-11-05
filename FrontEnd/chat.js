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
    .then(response=>{
        console.log(response);
    }).catch(err=>{
        console.log(err);
    })
}

