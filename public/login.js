const btn=document.getElementById('loginbtn');
 const token=localStorage.getItem('token');
// console.log(token);
function login(){
  
const email=document.getElementById('email').value;

const password=document.getElementById('password').value;
const entry={email,password};

    axios.post('http://localhost:8000/login',entry,{headers:{"Authorization":token}})
    .then((res)=>{
        // console.log(res.data);
        console.log("token",res.data);
       
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userid",res.data.userid);
        

        //alert(res.data);
        if(res.data.message){
            alert(res.data.message);
        }
        window.location.href='../Chat/chat.html';
    })
    .catch((err)=>{
   console.log(err);
   alert(err);
    })
}