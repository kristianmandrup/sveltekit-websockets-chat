import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: any) {
		const io = new Server(server.httpServer);

		const username = `User ${Math.round(Math.random() * 999999)}`;
		io.emit('name', username);

		io.on('connection', (socket) => {
			socket.emit('channel:message', `${username}: Hello, World 👋`);
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
