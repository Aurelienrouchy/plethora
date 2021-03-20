import { showError } from "./errors";
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
            scratchBeforeUnlock: t.scratchBeforeUnlock,
            image: t.imageUrl
        }))
        
        return tickets;
    } catch (err) {
        showError('Error with tickets loading')
    }
}