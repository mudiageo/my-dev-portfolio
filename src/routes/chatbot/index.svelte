<script>

import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	
let messages = []
let newMessage
let prompt
	onMount(async () => { })
	
const sendMessage = ()=> {
messages = [...messages, {sender:'Mudia', message: newMessage}]
let promptMessage = messages.map(item => `${item.sender}: ${item.message} Bot:`).toString().replaceAll('Bot:,', ' ')
let context = `${prompt} ${promptMessage}`
alert(context)
}


	
</script>

<form on:submit|preventDefault={sendMessage}>
Personality: <textarea>{prompt}</textarea>
{#each messages as {sender, message}}
<span>{sender} : {message}</span> 

{/each}
<input type="text" bind:value={newMessage}>
<button type="submit">Submit</button>
</form>
Index
