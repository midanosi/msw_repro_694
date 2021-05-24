import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetchPonyfill from "fetch-ponyfill"
// import fetch from 'cross-fetch';

const { fetch } = fetchPonyfill()


const cache = new InMemoryCache()
const link = new HttpLink({
    uri: "http://localhost:3001/graphql",
    fetch: (uri, options) => {
        const { operationName } = JSON.parse(options.body)
        return fetch(`${uri}?${operationName}`, options)
    },
    // fetch,
})

const client = new ApolloClient({
    cache,
    link: link,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
        },
    },
})
// https://github.com/apollographql/react-apollo/issues/1747#issuecomment-603444537
if (process.env.NODE_ENV === "test") {
    client.defaultOptions = {
        watchQuery: {
            fetchPolicy: "no-cache", // ONLY RELEVANT BIT
        },
    }
}

export { client }
