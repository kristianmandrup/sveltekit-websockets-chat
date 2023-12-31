import http from 'http';
import express from 'express';
import injectSocketIO from '../socket-handler.';
import { handler } from '../build/handler';

const app = express();
const server = http.createServer(app);

// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
	console.log('Websocket Server running on http://localhost:3000');
});
