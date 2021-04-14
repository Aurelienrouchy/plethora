
import { GET_SCRATCH_NUMBERS, PARTICIPATE_LOTO } from "./schemaGraphQl"
import { showMessage } from "./message";
import client from './clientGraphQl';

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
        showMessage('Error with lotos loading')
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
        showMessage('Error with user tickets')
    }
}