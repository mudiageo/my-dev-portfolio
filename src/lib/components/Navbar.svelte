<script>
	import { page } from '$app/stores';
  import {onMount} from 'svelte'
  import ThemeSelect from './ThemeSelect.svelte'
  onMount(() => {
  const menuBtn = document.querySelector('button.menu-button');
  const navMenu = document.querySelector('.mobile-menu');
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  })
})
</script>
<nav class="flex flex-wrap
items-center
justify-between
w-full
py-4
md:py-0
px-4
text-lgmb-16 shadow-lg bg-neutral text-neutral-content sticky top-0 z-10">

          <div>
              <!--Website Logo-->
              <a sveltekit:prefetch href="/" class="flex items-center py-4 px-2">
              <img src="favicon.png" alt="Logo" class="h-8 w-8 mr-2">
                  <span class="font-semibold text-lg">
                      Mudiaga Arharhire
                  </span>
              </a>
          </div>
  <div class="hidden md:flex items-center space-x-1">
<a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/" class="py-4 px-2 border-b-4 border-purple-500 font-semibold">
 Home
           </a>
<a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/" class="py-4 px-2 font-semibold hover:text-purple-500 transition duration-300">
 Services
</a>  
<a class:active={$page.url.pathname === '/projects'} sveltekit:prefetch href="/projects" class="py-4 px-2 font-semibold hover:text-purple-500 transition duration-300">
Portfolio
</a>

<a class:active={$page.url.pathname === '/posts'} sveltekit:prefetch href="/posts"
class="py-4 px-2 font-semibold hover:text-purple-500 transition duration-300">
Blog
</a>
<a class:active={$page.url.pathname === '/about'} sveltekit:prefetch href="/about" class="py-4 px-2 font-semibold hover:text-purple-500 transition duration-300">
       About
 </a>
          <a href="/"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
       Contact Us
</a>
</div>
<div class="md:hidden flex items-center">
<button class="outline-none menu-button">
  <svg class="w-6 h-6 " x-show="! showMenu" fill="none" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor"><path d="m4 6h16M4 12h16M4 18h16"></path>
  </svg>
</button>
   </div>
   <div class="hidden mobile-menu">
       <ul class="">
           <li> 
             <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
              class="block text-sm px-2 py-4 bg-purple-500 font-semibold">
             Home
           </li>
           <li>
            <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Services
          </a>
          </li>
          <li>
            <a class:active={$page.url.pathname === '/projects'} sveltekit:prefetch href="/projects"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Portfolio
          </a>
          </li>
          <li>
            <a class:active={$page.url.pathname === '/posts'} sveltekit:prefetch href="/posts"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Blog
          </a>
          </li>
           <li>
           <a class:active={$page.url.pathname === '/about'} sveltekit:prefetch href="/about"
            class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
           About
         </a>
           </li>
           <li>
            <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
           Contact Us
     </a></li>
     <li class="px-4">
      <ThemeSelect />
    </li>
       </ul>
   </div>
</div>
</div>
</nav>
  