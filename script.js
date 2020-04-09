const socket = io("http://201.209.104.33:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const appendMsg = (msg) => {
  //Pinta los mensajes en pantalla
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  messageContainer.appendChild(msgElement);
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMsg(`Tú: ${message}`);
  socket.emit("send-chat-message", message); // 1. envía al otro usuario el mensaje
  messageInput.value = "";
});

const name = prompt("Escribe tu nombre aquí");
appendMsg("Has entrado a Chat555X");
socket.emit("new-user", name); //envio el mensaje de "new-user"

//Lo siguiente le aparecerá al otro usuario conectado
socket.on("user-connected", (name) => {
  appendMsg(`${name} inició sesión`); // 2. recibo el mensaje y lo pinto en pantalla
});

socket.on("chat-message", (data) => {
  appendMsg(`${data.name}: ${data.message}`); // 3. recibo el mensaje y lo pinto en pantalla
});

socket.on("user-disconnected", (name) => {
  appendMsg(`${name} se desconectó`); // 2. recibo el mensaje y lo pinto en pantalla
});