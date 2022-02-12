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
<div
  class="navbar mb-16 shadow-lg bg-neutral text-neutral-content sticky top-0 z-10"
>
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
          <div class="flex space-x-7">
              <!--Website Logo-->
              <a href="/" class="flex items-center py-4 px-2">
<img src="favicon.png" alt="Logo" class="h-8 w-8 mr-2">
                  <span class="font-semibold text-gray-500 text-lg">
                      Mudiaga Arharhire
                  </span>
              </a>
          </div>
          <div class="hidden md:flex items-center space-x-1">
           <a href="/" 
class="py-4 px-2 text-gray-500 border-b-4 border-purple-500 font-semibold">
 Home
</a>
<a href="/"
    class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
 Services
</a>
    
<a href="/portfolio"
class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
Portfolio
</a>

<a href="/posts"
class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
Blog
</a>
<a href="/about"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
       About
 </a>
          <a href="/"
          class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
       Contact Us
</a>
           </div>
<div class="md:hidden flex items-center">
<button class="outline-none menu-button">
           <svg class="w-6 h-6 text-gray-500" x-show="! showMenu" fill="none" stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor"><path d="m4 6h16M4 12h16M4 18h16"></path>
</svg>
       </button>
   </div>
   <div class="hidden mobile-menu">
       <ul class="">
           <li class="active"> 
             <a href="/"
              class="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold">
             Home
           </li>
           <li>
            <a href="/"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Services
          </a>
          </li>
          <li>
            <a href="/projects"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Portfolio
          </a>
          </li>
          <li>
            <a href="/posts"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
            Blog
          </a>
          </li>
           <li>
           <a href="/about"
            class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
           About
         </a>
           </li>
           <li>
            <a href="/"
             class="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300">
           Contact Us
     </a></li>
       </ul>
   </div>
</div>
</div>
</nav>
  <!-- <div class="flex-1 px-2 mx-2">
    <a class="text-lg font-bold" class:active={$page.url.pathname === '/'} sveltekit:prefetch href="/">Portfolio and Blog</a>
  </div>

  <div class="dropdown dropdown-left lg:hidden">
    <div tabindex="0" class="m-1 btn">Links</div>
    <ul
      tabindex="0"
      class="bg-neutral rounded-box shadow text-neutral-content p-2 w-52 menu dropdown-content "
    >
      <a class:active={$page.url.pathname === '/projects'} sveltekit:prefetch href="/projects" class="btn btn-ghost btn-sm rounded-btn">
        Portfolio
      </a>
      <a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.url.pathname === '/posts'} sveltekit:prefetch  href="/posts">
        Blog
      </a>
      <a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.url.pathname === '/about'} sveltekit:prefetch href="/about">
        About
      </a>
      <div class="px-4">
        <ThemeSelect />
      </div>
    </ul>
  </div>

  <div class="flex-none hidden px-2 mx-2 lg:flex">
    <div class="flex items-stretch">
      <a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.url.pathname === '/projects'} sveltekit:prefetch href="/projects">
        Portfolio
      </a>
      <a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.url.pathname === '/posts'} sveltekit:prefetch href="/posts"
        >Blog</a
      >
      <a class="btn btn-ghost btn-sm rounded-btn" class:active={$page.url.pathname === '/about'} sveltekit:prefetch href="/about"
        >About</a
      >
    </div>
  </div> -->
</div>