const btn=document.getElementById('loginbtn');
function login(){
  
const email=document.getElementById('email').value;

const password=document.getElementById('password').value;
const entry={email,password};
console.log(entry);
    axios.post('http://localhost:8000/login',entry)
    .then((res)=>{
        console.log(res.data);
        alert(res.data);
    })
    .catch((err)=>{
   console.log(err);
   alert(err);
    })
}