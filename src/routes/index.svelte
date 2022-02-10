<script context="module">
    import ProjectCard from '$lib/components/ProjectCard.svelte'
    import { client } from '$lib/graphql-client'
    import { gql } from 'graphql-request'

  export const load = async () => {

    const query = gql`
      query GetProjects {
        projects {
          name
          slug
          description
          demo
          sourceCode
          image {
            url
          }
        }
      }
    `

    const { projects } = await client.request(query)

    return {
      props: {
        projects,
      },
    }
  }
</script>

<script>
  export let projects
</script>

<pre>{JSON.stringify(projects, null, 2)}</pre>
<h1>Recent Projects by Me</h1>

<div>
  {#each projects as project}
    <ProjectCard {project}/>
  {/each}
</div>