const port='http:localhost:3000';




function save(event){
    event.preventDefault();

    const email=event.target.email;
    const password=event.target.password;
    const obj={
        email,
        password
    }
    axios.post(`${port}/user/login`,obj).then(response=>{
        console.log(response);
    }).catch(err=>{
        console.log(err);
    })
}