<script>
export let project
let {name, description, image, slug} = project
</script>
<div>
    <img src={image[0].url} alt={name} />
    <a href={`/projects/${slug}`}>
      <div>
        <h2>{name}</h2>
        <p>
          {description.slice(0, 80)}...
        </p>
      </div>
    </a>
  </div>