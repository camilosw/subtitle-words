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
      const setWords: any = {};
      if (words.new.length) {
        setWords.new = firestore.FieldValue.arrayUnion(...words.new);
      }
      if (words.known.length) {
        setWords.known = firestore.FieldValue.arrayUnion(...words.known);
      }
      const result = db
        .collection('words')
        .doc(userId)
        .set(setWords, { merge: true });
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
