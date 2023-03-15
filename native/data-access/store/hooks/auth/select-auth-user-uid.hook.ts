import { selectAuthUserUid } from '../../auth';
import { useAppSelector } from '../../store';

export const useSelectAuthUserUid = () => useAppSelector(selectAuthUserUid);
