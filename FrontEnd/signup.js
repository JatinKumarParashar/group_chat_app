const port='http:localhost:3000'



async function save(event){
    event.preventDefault();
    const username=event.target.username.value;
    const email=event.target.email.value;
    const number=event.target.number.value;
    const password=event.target.password.value;
    const obj={
        username,
        email,
        number,
        password
    }
    const response=await axios.post(`${port}/user/add-user`,obj);
    console.log('response >>>>>',response);


}