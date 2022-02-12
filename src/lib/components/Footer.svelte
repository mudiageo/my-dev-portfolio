<script>
    import FacebookIcon from './FacebookIcon.svelte'
    import TwitterIcon from './TwitterIcon.svelte'
    import YouTubeIcon from './YoutubeIcon.svelte'
  </script>
  
  <footer
    class="p-10 footer bg-primary text-primary-content footer-center"
  >
    <div class="grid grid-flow-col gap-4">
      <a class="link link-hover" sveltekit:prefetch href="/projects">Portfolio</a>
      <a class="link link-hover" sveltekit:prefetch href="/posts">Blog</a>
      <a class="link link-hover" sveltekit:prefetch href="/about">About</a>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a href="https://twitter.com">
          <TwitterIcon />
        </a>
        <a href="https://youtube.com">
          <YouTubeIcon />
        </a>
        <a href="https://facebook.com">
          <FacebookIcon />
        </a>
      </div>
    </div>
    <div>
      <p>
        Copyright &copy; {`${new Date().getFullYear()}`} - All right reserved
        by ME
      </p>
    </div>
  </footer>