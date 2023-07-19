import injectSocketIO from './socket-handler.js';

export const webSocketServer = {
	name: 'webSocketServer',
	// @ts-ignore
	configureServer(server) {
		injectSocketIO(server.httpServer);
	}
};
