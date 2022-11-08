const port='http:localhost:3000';




function save(event){
    event.preventDefault();

    const email=event.target.email.value;
    const password=event.target.password.value;
    const obj={
        email,
        password
    }
   
    axios.post(`${port}/user/login`,obj).then(response=>{
        console.log(response);
        alert('Login successfully')
        localStorage.setItem('token', response.data.token);
        localStorage.removeItem('oldMessage');
        window.location.href='C:/Users/jaykp/Desktop/group_chat_app/FrontEnd/creategroup.html'

    }).catch(err=>{
        if (err.response.status == 401) {
            alert('your password is not correct')
        }
        else {
            alert('user does not exist');
        }
        console.log(err);
        console.log(err);
    })
}