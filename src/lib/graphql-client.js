import { GraphQLClient } from 'graphql-request'
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_API
export const client = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/ckzehv4xm2yp701z534u201vt/master')