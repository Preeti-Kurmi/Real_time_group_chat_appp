const btn=document.getElementById('singupbtn');
function save(){
    const name=document.getElementById('name').value;
const email=document.getElementById('email').value;
const phoneno=document.getElementById('phoneno').value;
const password=document.getElementById('password').value;
const entry={name,email,phoneno,password};
    axios.post('http://localhost:8000/signup',entry)
    .then((res)=>{
        console.log(res.data);
        if(res.data.errors){
            alert(res.data.errors);

        }
        else if(res.data.message){
            alert(res.data.message);
        }
       

    })
    .catch((err)=>{
   console.log(err);
    })
}