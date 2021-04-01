import { showMessage } from "./message";
import { GET_LOTOS, GET_TICKETS, GET_USER_TICKETS } from "./schemaGraphQl";
import client from './clientGraphQl';

export const getTickets = async () => {
    try {
        const res = await client.query({
            query: GET_TICKETS
        })
        const tickets = res.data.getTickets.map(t => ({
            id: t.id,
            level: t.level,
            minCoins: t.minCoins,
            maxCoins: t.maxCoins,
            scratchableBeforeUnlock: t.scratchableBeforeUnlock,
            imageUrl: t.imageUrl,
            imageFrontUrl: t.imageFrontUrl,
            imageBackUrl: t.imageBackUrl,
            progressColor: t.progressColor
        }));
        return tickets;
    } catch (err) {
        showMessage('Error with tickets loading')
    }
}

export const getLotos = async () => {
    try {
        const res = await client.query({
            query: GET_LOTOS,
        })
        const lotos = res.data.getLotos;
        return lotos;
    } catch (err) {
        showMessage('Error with lotos loading')
    }
}

export const getUserTickets = async (userId: string) => {
    try {
        const res = await client.query({
            query: GET_USER_TICKETS,
            variables: { userId }
        })
        const lotos = res.data.getUserTickets;
        return lotos;
    } catch (err) {
        showMessage('Error with user tickets')
    }
}
