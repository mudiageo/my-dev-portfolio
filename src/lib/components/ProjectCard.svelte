<script>
export let project
let {name, description, image, slug} = project
</script>
<div class="relative group card shadow-2xl col-span-2">
    <img src={image[0].url} alt={name} class="object-cover h-full"/>
    <a sveltekit:prefetch href={`/projects/${slug}`}>
      <div class="absolute bottom-0 left-0 right-0 lg:opacity-0 group-hover:opacity-100 bg-primary p-4 duration-300 text-primary-content">
       <h2 class="font-bold lg:text-xl">{name}</h2>
       <p class="text-sm lg:text-xl">
         {description.slice(0, 80)}...
        </p>
      </div>
    </a>
  </div>