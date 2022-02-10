import { gql } from 'graphql-request'

export const authorsQuery = gql`
  query GetAuthors {
    authors {
      name
      intro
      bio
      slug
      picture {
        url
      }
    }
  }
`

const PROJECT_FRAGMENT = gql`
  fragment ProjectDetails on Project {
      name
      slug
      description
      tags
      demo
      sourceCode
      image {
        url
      }
    
  }`
  export const projectsQuery = gql`
  query GetProjects {
    projects {
        ...ProjectDetails
    }
  }
`
export const projectQuery = gql`
query GetProject($slug: String) {
  project(where: { slug: $slug}) {
      ...ProjectDetails
  }
}
`
const POST_FRAGMENT = gql`
  fragment PostDetails on Post {
    title
    slug
    date
    content
    tags
    coverImage {
      url
    }
    authors {
      name
    }
  }
`

export const postsQuery = gql`
  ${POST_FRAGMENT}
  query GetPosts {
    posts {
      ...PostDetails
    }
  }
`

export const postQuery = gql`
  ${POST_FRAGMENT}
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      ...PostDetails
    }
  }
`