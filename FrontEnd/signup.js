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
    await axios.post(`${port}/user/add-user`,obj).then(response=>{

        console.log('response >>>>>',response);
        alert('User has signUp Successfully')
    }).catch(err=>{
        console.log(err);
        alert('You have already exist or invalid inputs')

    })
    
    


}