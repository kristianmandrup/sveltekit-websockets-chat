<script lang="ts">
	import { io } from '$lib/realtime';
	import { onMount } from 'svelte';

	let textfield = '';
	let username = '';

	let messages: string[] = [];

	onMount(() => {
		io.on('message', (message) => {
			// Listen to the message event
			messages = [...messages, message];
		});
		io.on('name', (name) => {
			// Another listener for the name:
			username = name; // Update the name so it can be displayed
		});
	});

	function sendMessage() {
		const message = textfield.trim();
		if (!message) return;

		textfield = '';
		io.emit('message', message); // Send the message
	}
</script>
