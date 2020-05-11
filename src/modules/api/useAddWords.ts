import { db } from 'modules/firebase';
import { firestore } from 'firebase';
import useQueryHelper from './useQueryHelper';
import { Words } from './types';

const useAddWords = () => {
  const {
    setData,
    startLoading,
    setError,
    ...rest
  } = useQueryHelper<Words | null>();

  const addWords = async (userId: string, words: Words) => {
    try {
      startLoading();
      const result = db
        .collection('words')
        .doc(userId)
        .set(
          {
            new: firestore.FieldValue.arrayUnion(...words.new),
            known: firestore.FieldValue.arrayUnion(...words.known),
          },
          { merge: true },
        );
      setData(null);
      return result;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return [addWords, rest] as const;
};

export default useAddWords;
