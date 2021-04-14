import { ApolloClient, split, from, HttpLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from 'expo-secure-store';
import { showMessage } from "./message";

// const httpLink = createHttpLink({ uri: 'https://izy-back.herokuapp.com/graphql' });
const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );2
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const wsLink = new WebSocketLink({
  uri: 'http://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

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
        splitLink
    ]),
    cache: new InMemoryCache()
});

export default client;