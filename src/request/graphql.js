import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const queryGraph = async (query) => {
  return new Promise((resolve, reject) => {
    try {
      client
        .query({
          query: gql`
            ${query}
          `,
        })
        .then((result) => {
          resolve(result)
        })
    } catch (error) {
      reject(error)
    }
  })
}
