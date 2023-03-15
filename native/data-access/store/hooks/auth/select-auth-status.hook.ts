import { selectAuthStatus } from '../../auth';
import { useAppSelector } from '../../store';

export const useSelectAuthStatus = () => useAppSelector(selectAuthStatus);
