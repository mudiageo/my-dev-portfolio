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
text-lg mb-16 shadow-lg bg-neutral text-neutral-content sticky top-0 z-10">

          <div>
              <!--Website Logo-->
              <a sveltekit:prefetch href="/" class="flex items-center py-4 px-2">
              <img src="favicon.png" alt="Logo" class="h-8 w-8 mr-2">
                  <span class="font-semibold text-lg">
                      Mudiaga Arharhire
                  </span>
              </a>
          </div>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          class="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
     

  
   <div class="hidden w-full md:flex md:items-center md:w-auto" id="menu">
       <ul class=" pt-4
       text-base 
       md:flex
       md:justify-between 
       md:pt-0">
           <li> 
             <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
              class="block text-sm px-2 py-4 font-semibold">
             Home
           </li>
           <li>
            <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
             class="block text-sm px-2 py-4 transition duration-300">
            Services
          </a>
          </li>
          <li>
            <a class:active={$page.url.pathname === '/projects'} sveltekit:prefetch href="/projects"
             class="block text-sm px-2 py-4 transition duration-300">
            Portfolio
          </a>
          </li>
          <li>
            <a class:active={$page.url.pathname === '/posts'} sveltekit:prefetch href="/posts"
             class="block text-sm px-2 py-4 transition duration-300">
            Blog
          </a>
          </li>
           <li>
           <a class:active={$page.url.pathname === '/about'} sveltekit:prefetch href="/about"
            class="block text-sm px-2 py-4 transition duration-300">
           About
         </a>
           </li>
           <li>
            <a class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/"
             class="block text-sm px-2 py-4 transition duration-300">
           Contact Us
     </a></li>
     <li class="block text-sm px-2 py-4 transition duration-300">
      <ThemeSelect />
    </li>
       </ul>
   </div>

</nav>
  