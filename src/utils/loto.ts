import { addLotoGrid, setLotoLoading } from '../provider/lotos/lotos.actions';
import { store } from './store';


export const participate = (numbers: number[], id: number) => {
    setLotoLoading(true)
    try {
        // TODO : make api call

        addLotoGrid(numbers, id)
        setLotoLoading(false)
    } catch (err) {
        setLotoLoading(false)
    }
}