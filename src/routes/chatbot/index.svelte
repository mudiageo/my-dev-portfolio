<script>

import { onMount } from 'svelte';
	
	
let messages = []
let newMessage
let prompt 
	onMount(async () => { })
	
const sendMessage = async () => {
messages = [...messages, {sender:'Mudia', message: newMessage, bg: 'text-gray-700', position: 'end'}]
let promptMessage = messages.map(item => `${item.sender}: ${item.message} Bot:`).toString().replaceAll('Bot:,', ' ')
let context = `${prompt} ${promptMessage}`

const response = await fetch('http://api.vicgalle.net:5000/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
  body: 
    JSON.stringify({
      context: context,
      temperature: 1,
      top_p: 0.9,
      token_max_length: 30 
  })
		   });
  let botMessage = await response.json().body.text


messages = [...messages, {sender:'Bot', message: botMessage, bg: '', position: 'start'}]


}


	
</script>

<form on:submit|preventDefault={sendMessage}>
Personality: <textarea bind:value={prompt}></textarea>

<div class="max-w-2xl border rounded">
          <div class="w-full">
            <div class="relative flex items-center p-3 border-b border-gray-300">
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
              <span class="block ml-2 font-bold text-gray-600">Bot</span>
              <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
            </div>
            <div class="relative w-full p-6 overflow-y-auto h-[40rem]">

              <ul class="space-y-2">
                {#each messages as {sender, message, bg, position}}


                <li class="flex justify-{position}">
                  <div class="relative max-w-xl px-4 py-2 {bg} rounded shadow">
                    <span class="block">{message} </span>
                  </div>
                </li>

{/each}
              </ul>

            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input type="text" bind:value={newMessage} placeholder="Message"
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button type="submit">
                <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>


</form>

