import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    // uri: 'http://localhost:3000/graphql',
    uri: 'https://izy-back.herokuapp.com/graphql',
    cache: new InMemoryCache()
});

export const GET_TICKETS = gql`
    query {
        getTickets {
            id
            level
            minCoins
            maxCoins
            scratchableBeforeUnlock
            imageUrl
            progressColor
        }
    }
`;

// MUTATION

export const LOGIN_OR_REGISTER = gql`
    mutation LoginOrRegister($token: String!, $provider: String!) {
        loginOrRegister(token: $token, provider: $provider) {
            firstname
            lastname
            photoUrl
            email
            coins
            trees
            ticketsProgress
        }
    }
`;