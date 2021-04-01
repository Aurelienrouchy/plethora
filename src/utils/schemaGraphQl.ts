import { gql } from '@apollo/client';

export const GET_TICKETS = gql`
    query {
        getTickets {
            id
            level
            minCoins
            maxCoins
            scratchableBeforeUnlock
            imageUrl
            imageFrontUrl
            imageBackUrl
            progressColor
        }
    }
`;

export const GET_LOTOS = gql`
    query {
        getLotos {
            id
            title
            cost
            timer
            imageUrl
            lotoNumbers
            lotoComplementary
            maxNumbers
            maxComplementary
        }
    }
`;

export const GET_USER_TICKETS = gql`
    query  GetUserTickets($userId: String!) {
        getUserTickets(userId: $userId) {
            id
            lotoId
            classic
            complementary
        }
    }
`;

// MUTATION

export const PARTICIPATE_LOTO = gql`
    mutation ParticipateLoto($input: ParticipateLotoInput!) {
        participateLoto(input: $input) {
            userId
            lotoId
            classic
            id
            complementary
            coins
        }
    }
`;

export const GET_SCRATCH_NUMBERS = gql`
    mutation GetScratchNumbers($ticketId: ID!) {
        getScratchNumbers(ticketId: $ticketId) {
            numbers
		    coins
        }
    }
`;

export const LOGIN_OR_REGISTER = gql`
    mutation Login($token: String!, $provider: String!) {
        loginOrRegister(token: $token, provider: $provider) {
            id
            token
            firstname
            lastname
            photoUrl
            email
            coins
            trees
        }
    }
`;