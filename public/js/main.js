const socket=io();
const {username,room} =Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
const chatRoom=document.querySelector("#room-name");
chatRoom.textContent=room;
socket.emit("joinRoom",{username,room});
const messages=document.getElementsByClassName('chat-messages')[0];
const chatForm=document.getElementById("chat-form");
socket.on('message',(data)=>{
    console.log(data);
    output(data);
    messages.scrollTop=messages.scrollHeight;
});


chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg= e.target.elements.msg;
    console.log(msg);
    const data={
        username,text:msg.value
    }
    socket.emit("newMessage", data);
    msg.value='';
    msg.focus();
});

function output(data){
    const msgBox=document.createElement('div');
    msgBox.classList.add("message");
    msgBox.innerHTML=`<p class="meta">${data.username} <span>${data.time}</span></p>
    <p class="text">
        ${data.text}
    </p>`
    messages.appendChild(msgBox);
}