<script context="module">
    import ProjectCard from '$lib/components/ProjectCard.svelte'
    import { client } from '$lib/graphql-client'
    import { authorsQuery, projectsQuery } from '$lib/graphql-queries'
    export const load = async () => {
   
    
    const [authorsReq, projectsReq] = await Promise.all([
      client.request(authorsQuery),
      client.request(projectsQuery),
    ])
    const { authors } = authorsReq
    const { projects } = projectsReq

    return {
      props: {
        projects,
        authors,
      },
    }
  }
</script>

<script>
    export let projects
    export let authors
  </script>
  <svelte:head>
    <title>Mudiaga Arharhire || Developer Portfolio and Blog</title>
  </svelte:head>
<h1 class="font-bold text-center mb-20 text-5xl">
    Welcome to My World
</h1>
<div class="grid gap-10 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:-mx-52">
  <div class="lg:"></div>
  <div class="lg:"></div>
</div>
  
  {#each authors as { name, intro, picture: { url } }}
    <div class="flex mb-40 items-end">
      <div class="mr-6">
        <h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
        <p class="text-xl mb-4">{intro}</p>
      </div>
  
      <img class="mask mask-squircle h-48" src={url} alt={name} />
    </div>
  {/each}
  <div class="grid gap-10 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:-mx-52">
  {#each projects as project}
    <ProjectCard {project}/>
  {/each}
</div>