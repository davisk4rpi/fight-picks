import { useUserByUid } from '@fight-picks/native-data-access';

export const useScoreRow = (userUid: string) => {
  const { user, loading } = useUserByUid(userUid);

  return {
    playerName: user?.displayName?.split(' ')[0] ?? '',
    playerNameLoading: loading,
  };
};
