const { io } = require("socket.io-client");
const socket = io("https://socketeer.muchtek.repl.co");
const myRL = require("serverline");
let name = '';

const clearLastLine = () => {
  process.stdout.moveCursor(0, -1) // up one line
  process.stdout.clearLine(1) // from cursor to end
}

socket.on("connect", () => {
  console.log(`connected: ${socket.connected}`); // true
});

socket.on("disconnect", () => {
  console.log(`connected: ${socket.connected}`); // false
});

socket.on("message", (msg) => {
  console.log(`${msg}`);
});

console.log(Array(process.stdout.rows + 1).join('\n'));

myRL.init()

myRL.question('username: ', (usern) => {
  console.log(`username set to: ${usern}`);
  myRL.setPrompt(`> `);
  name = usern;
})

myRL.on('line', function(text) {
  socket.emit('message', `[${name}]: ${text}`);
  clearLastLine();
});
