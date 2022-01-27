const socket = new WebSocket("ws://localhost:8990");

socket.addEventListener("open", function (event) {
  socket.send("Connected to Socket");
});

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

const sendMessage = () => {
  socket.send("Hey!! Sorry To disturb you!!");
};
