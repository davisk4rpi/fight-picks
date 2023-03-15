import { useAppSelector } from '../../store';
import { selectCurrentUser } from '../../user';

export const useSelectCurrentUser = () => useAppSelector(selectCurrentUser);
