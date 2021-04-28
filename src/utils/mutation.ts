
import { GET_SCRATCH_NUMBERS, PARTICIPATE_LOTO } from "./schemaGraphQl"
import client from './clientGraphQl';
import Toast from "react-native-toast-message";

export const participateLotoAsync = async (input) => {
    try {
        const res =  await client.mutate({
            mutation: PARTICIPATE_LOTO,
            variables: {
                input
            }
        });
        const ticket = res?.data?.participateLoto;
        return ticket;
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Error with lotos loading'
        })
    }
}

export const getScratchNumbers = async (ticketId: string) => {
    try {
        const res = await client.mutate({
            mutation: GET_SCRATCH_NUMBERS,
            variables: { ticketId }
        })
        const data = res.data.getScratchNumbers;
        return data;
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Error with ticket loading'
        })
    }
}