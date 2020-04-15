import React, { useReducer } from 'react';
import { subTitleType } from 'subtitle';
import preprocessor from 'text-preprocessor';
import { useDispatch } from 'react-redux';
import AddSubtitles from 'components/AddSubtitles';
import { addWords } from 'store/wordsSlice';

import { css } from 'astroturf';
import { useHistory } from 'react-router';
import Word from 'components/Word';
import Button from 'components/UI/Button';

const cn = css`
  .listContainer {
  }
  .actions {
    position: sticky;
    top: 51px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin: 0 -1rem;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  }
  .marked {
    background-color: var(--secondary-light);
    &:hover {
      background-color: var(--secondary-light-hover);
    }
  }
`;

interface ActionPopulate {
  type: 'POPULATE';
  subtitles: subTitleType[];
}

interface ActionToggleWord {
  type: 'TOGGLE_WORD';
  word: string;
}

type Action = ActionPopulate | ActionToggleWord;

const extractWords = (subtitles: subTitleType[]) => {
  const text = subtitles.map(subtitle => subtitle.text).join(' ');
  const cleanText = preprocessor(text)
    .unescape()
    .killUnicode()
    .normalizeSingleCurlyQuotes()
    .toLowerCase()
    .replace(/[^a-zA-Z'\s-]/g, ' ')
    .replace(/(\n|\s'|'\s|\s-|-\s)/g, ' ')
    .toString();
  const uniqueWords = [...new Set(cleanText.split(' '))]
    .filter(word => word.length > 1)
    .sort()
    .map(word => [word, false] as [string, boolean]);
  return new Map(uniqueWords);
};

const reducer = (state: Map<string, boolean>, action: Action) => {
  switch (action.type) {
    case 'POPULATE':
      return extractWords(action.subtitles);

    case 'TOGGLE_WORD': {
      const marked = state.get(action.word);
      state.set(action.word, !marked);
      return new Map([...state]);
    }

    default:
      return state;
  }
};

const getMarked = (words: Map<string, boolean>) => {
  return [...words].filter(word => word[1]).length;
};

const AddSubtitlesRoute = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, new Map<string, boolean>());
  const globalDispatch = useDispatch();
  // const { knownWords } = useSelector(
  //   (globalState: RootState) => globalState.wordsSlice,
  // );

  const handleFinish = () => {
    const newWords = [...state]
      .filter(([, marked]) => marked)
      .map(([word]) => word);
    const knownWords = [...state]
      .filter(([, marked]) => !marked)
      .map(([word]) => word);
    globalDispatch(addWords({ newWords, knownWords }));
    history.push('/');
  };

  return (
    <div>
      {state.size === 0 ? (
        <AddSubtitles
          onAdded={subtitles => dispatch({ type: 'POPULATE', subtitles })}
        />
      ) : (
        <div className={cn.listContainer}>
          <div className={cn.actions}>
            <div>
              New words: {getMarked(state)} / {state.size}
            </div>
            <div>
              <Button onClick={handleFinish}>Finish</Button>
            </div>
          </div>
          {[...state].map(([word, marked]) => (
            <Word
              key={word}
              onClick={() => dispatch({ type: 'TOGGLE_WORD', word })}
              className={marked ? cn.marked : ''}
              word={word}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddSubtitlesRoute;
