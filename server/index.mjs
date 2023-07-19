import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	let username = `User ${Math.round(Math.random() * 999999)}`;
	io.emit('name', username);

	const message = 'Hello, World 👋';
	const msg = {
		from: username,
		message: message,
		time: new Date().toLocaleString()
	};
	socket.emit('channel:message', msg);
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port);
