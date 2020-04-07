/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordsPayload {
  knownWords: string[];
  newWords: string[];
}

interface WordsState {
  knownWords: Set<string>;
  newWords: Set<string>;
}

const initialState: WordsState = {
  knownWords: new Set(),
  newWords: new Set(),
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<WordsPayload>) {
      state.knownWords = new Set([
        ...state.knownWords,
        ...action.payload.knownWords,
      ]);
      state.newWords = new Set([...state.newWords, ...action.payload.newWords]);
    },
    toggleWord(state, action: PayloadAction<string>) {
      if (state.knownWords.has(action.payload)) {
        state.knownWords.delete(action.payload);
        state.newWords.add(action.payload);
      } else {
        state.knownWords.add(action.payload);
        state.newWords.delete(action.payload);
      }
    },
  },
});

export const { addWords, toggleWord } = wordsSlice.actions;

export default wordsSlice.reducer;
