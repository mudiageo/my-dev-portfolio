<script>
    import Footer from '$lib/components/Footer.svelte'
    import Navbar from '$lib/components/Navbar.svelte'
    import '../app.css'
  </script>
  
  <Navbar />
  <main class="container max-w-3xl mx-auto px-4 mb-20">
    <slot />
  </main>
  <Footer />