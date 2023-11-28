const token = localStorage.getItem('token');
const leftdiv = document.getElementById('leftdiv');
const MESSAGE_STORAGE_KEY = 'messages';
const stroredmessagelimit = 10;
const socket = io('http://localhost:8000');


function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;


    if (message.trim() !== '') {
        // socket.emit("send-message",message);
        console.log("hi")
        axios.post('http://localhost:8000/message', { message }, { headers: { "Authorization": token } })
            .then((res) => {

                console.log(res.data);

                //  fetchdata();

            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
        messageInput.value = '';
    }
}
function fetchdata() {
    let storedMessages = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY)) || [];
    axios.get('http://localhost:8000/getmessage', { headers: { "Authorization": token } })
        .then((res) => {
            // Display(res.data)
            Display(res.data.message);
            console.log(res.data.message);
            //    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(allMessages));

        })
        .catch((err) => {
            console.log(err);

        })
}

function groupost(groupname) {
    const userid = localStorage.getItem("userid");
    const updategroup = { groupname, userid };
    axios.post('http://localhost:8000/creategroup', updategroup)
        .then((res) => {
            // console.log(res.data.groupname);
            fetchgroupdata();



        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
}
function group() {
    const groupname = prompt("Enter your groupname");
    groupost(groupname);


}




function Display(messages) {
    const rightdiv = document.getElementById('rightdiv');

    // Clear existing messages before displaying new ones
    rightdiv.innerHTML = '';

    messages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.className = "newmessage";

        // Adjust this line based on the actual structure of your response
        newMessage.innerHTML = `${message.message}`; // Assuming each item in messages is a string

        rightdiv.appendChild(newMessage);
    });
}
function displaygroup(data) {
    const groupchat = document.getElementById('useradded');
    groupchat.innerHTML = '';
    data.forEach(data => {
        const newgroup = document.createElement('div');
        newgroup.className = "displaygroupclass"
        newgroup.innerHTML = `<p>${data.groupname}<p>`
        groupchat.appendChild(newgroup);
        newgroup.addEventListener('click', async () => {
            let chathead = document.getElementById('chatid');
            chathead.textContent = `${data.groupname}`
            chathead.className = "newgroupchat"
            var imgElement = document.createElement("img");
            imgElement.className = 'imggroup';


            imgElement.src = "../logo.png";
            // Step 3: Append the image element to an existing HTML element or the document body
            chathead.appendChild(imgElement);

        })


    })

}
function fetchgroupdata() {
    axios.get('http://localhost:8000/getgroupname')
        .then((res) => {

            console.log(res.data);
            displaygroup(res.data);



        })
        .catch((err) => {
            console.log(err);

        })
}







window.onload = () => {
    //setInterval(fetchdata, 1000);
    // fetchdata();
    fetchgroupdata();

};
socket.on('connect', () => {
    socket.emit('user-joined', usertoken);
})

socket.on('user-joined-broadcast', user => {
    updateMessage(`${user.name} joined the chat`);
})


//when user sends a message
socket.on('receive-message', data => {
    //console.log("client msg data", data);
    displayMessage(data.user, data.message);
})

//user-left broadcast
socket.on('user-left', user => {
    updateMessage(`${user} left the chat`);
})