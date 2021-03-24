import { showMessage } from "./message";
import { client, GET_TICKETS } from "./graphql"

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
            image: t.imageUrl,
            progressColor: t.progressColor
        }));
        return tickets;
    } catch (err) {
        showMessage('Error with tickets loading')
    }
}