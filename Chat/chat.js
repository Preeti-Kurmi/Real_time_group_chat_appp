const token=localStorage.getItem('token');
const leftdiv=document.getElementById('leftdiv');

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    

    if (message.trim() !== '') {
       
        axios.post('http://localhost:8000/message',{message},{headers:{"Authorization":token}})
        .then((res)=>{
            console.log(res.data);
           
            fetchdata();
            
        })
        .catch((err)=>{
       console.log(err);
       alert(err);
        })
        messageInput.value = '';
    }
        }
function fetchdata(){
    axios.get('http://localhost:8000/getmessage',{headers:{"Authorization":token}})
    .then((res)=>{
       // Display(res.data)
       Display(res.data.message,res.data.name);
       console.log("res",res.data.message);
       console.log("name",res.data.name);
}


        
        
    )
    .catch((err)=>{
   console.log(err);
   alert(err);
    })
}



function Display(messages) {
    const rightdiv = document.getElementById('rightdiv');

    // Clear existing messages before displaying new ones
    rightdiv.innerHTML = '';

    messages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.className = "newmessage";

        // Adjust this line based on the actual structure of your response
        newMessage.innerHTML=`${ message.message}`; // Assuming each item in messages is a string

        rightdiv.appendChild(newMessage);
    });
}

    
   
   
    


window.onload = () => {
    setInterval(fetchdata, 1000);
    fetchdata();
};
