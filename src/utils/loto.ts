import { participate, setLotoLoading, showValidation } from '../provider/lotos/lotos.actions';
import { loto } from '../provider/lotos/lotos.types';
import { removeCoins } from '../provider/user/user.actions';
import { showMessage } from './message';
import { participateLotoAsync } from './mutation';

interface ParticipateParams {
    lotoId: string;
    userId: string;
    classic: number[];
    complementary: number[];
}

export const participateLoto = async (ticketLoto: ParticipateParams) => {
    setLotoLoading(true)
    try {
        const ticket = await participateLotoAsync(ticketLoto);
        console.log(ticket)
        if (ticket) {
            showValidation(true)
            setTimeout(() => showValidation(false), 2000)
    
            participate(ticket);
            removeCoins(ticket.coins);
        }

        setLotoLoading(false)
    } catch (err) {
        showMessage('Error server');
        setLotoLoading(false)
    }
}