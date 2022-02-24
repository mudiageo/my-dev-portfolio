<script>
import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../app.css';
let message = []
let newMessage
let prompt
	onMount(async () => { })
	
const sendMessage = ()=> {
messages = [...messages, {sender:'Mudia', message: newMessage}]
let promptMessage = messages.map(item => `${item.sender}: ${item.message} Bot:`).toString().replaceAll('Bot:,', ' ')
let context = `${prompt} ${promptMessage}`
}
	
</script>
