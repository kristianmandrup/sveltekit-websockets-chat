// socket-handler.js
import { Server } from 'socket.io';

// See https://linu.us/live-chat-with-sveltekit-and-socketio and https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function injectSocketIO(server) {
	const io = new Server(server);

	// Socket.IO stuff goes here
	io.on('connection', (socket) => {
		// Generate a random username and send it to the client to display it
		let username = `User ${Math.round(Math.random() * 999999)}`;
		socket.emit('name', username);

		// Receive incoming messages and broadcast them
		socket.on('message', (message) => {
			io.emit('message', {
				from: username,
				message: message,
				time: new Date().toLocaleString()
			});
		});
	});

	console.log('SocketIO injected');
}
