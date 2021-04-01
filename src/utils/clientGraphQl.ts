import { ApolloClient, ApolloLink, from, HttpLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from 'expo-secure-store';
import { showMessage } from "./message";

// const httpLink = createHttpLink({ uri: 'https://izy-back.herokuapp.com/graphql' });
const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await SecureStore.getItemAsync("token");
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    } catch (err) {
        showMessage(err.message)
    }
});

const client = new ApolloClient({
    link: from([
        authLink,
        errorLink,
        httpLink
    ]),
    cache: new InMemoryCache()
  });

export default client;