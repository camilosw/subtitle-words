/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordsPayload {
  known: string[];
  new: string[];
}

interface WordsState {
  known: Set<string>;
  new: Set<string>;
}

const initialState: WordsState = {
  known: new Set(),
  new: new Set(),
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<WordsPayload>) {
      state.known = new Set([...state.known, ...action.payload.known]);
      state.new = new Set([...state.new, ...action.payload.new]);
    },
    toggleWord(state, action: PayloadAction<string>) {
      if (state.known.has(action.payload)) {
        state.known.delete(action.payload);
        state.new.add(action.payload);
      } else {
        state.known.add(action.payload);
        state.new.delete(action.payload);
      }
    },
  },
});

export const { addWords, toggleWord } = wordsSlice.actions;

export default wordsSlice.reducer;
