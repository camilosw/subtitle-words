import { combineReducers } from '@reduxjs/toolkit';
import wordsSliceReducer from './wordsSlice';

const rootReducer = combineReducers({
  wordsSlice: wordsSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
