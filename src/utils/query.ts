import { GET_LOTOS, GET_TICKETS, GET_USER_TICKETS } from "./schemaGraphQl";
import client from './clientGraphQl';
import Toast from "react-native-toast-message";

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
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Problem with initialize tickets'
        })
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
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Problem with initialize lotos'
        })
    }
}

export const getUserTickets = async (userId: string) => {
    try {
        const res = await client.query({
            query: GET_USER_TICKETS,
            variables: { userId }
        })
        const lotos = res.data.getUserTickets.mpa(lt => ({
            ...lt,
            classic: lt.classic.split(' ').sort((a, b) => a - b),
            complementary: lt.complementary.split(' ').sort((a, b) => a - b),
        }));

        return lotos;
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Problem with initialize tickets'
        })
    }
}
