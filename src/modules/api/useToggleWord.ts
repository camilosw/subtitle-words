import { db } from 'modules/firebase';
import { firestore } from 'firebase';
import useQueryHelper from './useQueryHelper';

const useToggleWord = () => {
  const { setData, startLoading, setError, ...rest } = useQueryHelper();

  const toggleWord = async (
    userId: string,
    word: string,
    moveTo: 'new' | 'known',
  ) => {
    try {
      startLoading();
      const docRef = db.collection('words').doc(userId);
      if (moveTo === 'new') {
        await docRef.update({
          new: firestore.FieldValue.arrayUnion(word),
          known: firestore.FieldValue.arrayRemove(word),
        });
      } else {
        await docRef.update({
          new: firestore.FieldValue.arrayRemove(word),
          known: firestore.FieldValue.arrayUnion(word),
        });
      }

      setData(null);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return [toggleWord, rest] as const;
};

export default useToggleWord;
