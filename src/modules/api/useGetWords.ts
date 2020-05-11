import { db } from 'modules/firebase';
import useQueryHelper from './useQueryHelper';
import { Words } from './types';

const useGetWords = () => {
  const { startLoading, setData, setError, ...rest } = useQueryHelper<Words>();

  const getWords = async (userId: string) => {
    try {
      startLoading();
      const result = await db
        .collection('words')
        .doc(userId)
        .get();
      if (result.exists) {
        setData(result.data() as Words);
      } else {
        setData(undefined);
      }
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return [getWords, rest] as const;
};

export default useGetWords;
