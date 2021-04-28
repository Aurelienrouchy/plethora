import Toast from 'react-native-toast-message';
import { participate, setLotoLoading, showValidation } from '../provider/lotos/lotos.actions';
import { removeCoins } from '../provider/user/user.actions';
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
        const params = {
            ...ticketLoto,
            classic: ticketLoto.classic.sort((a, b) => a - b).join(' '),
            complementary: ticketLoto.complementary.sort((a, b) => a - b).join(' '),
        }
        const ticket = await participateLotoAsync(params);
        if (ticket) {
            showValidation(true)
            setTimeout(() => showValidation(false), 2000)
    
            participate(ticket);
            removeCoins(ticket.coins);
        }

        setLotoLoading(false)
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: err.message,
        })
        setLotoLoading(false)
    }
}