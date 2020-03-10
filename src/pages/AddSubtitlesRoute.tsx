import React, { useReducer } from 'react';
import { subTitleType } from 'subtitle';
import preprocessor from 'text-preprocessor';
import AddSubtitles from 'components/AddSubtitles';
import { css } from 'astroturf';

const cn = css`
  .listContainer {
  }
  .marked {
    background-color: #ddd;
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
  const [state, dispatch] = useReducer(reducer, new Map<string, boolean>());

  return (
    <div>
      {state.size === 0 ? (
        <AddSubtitles
          onAdded={subtitles => dispatch({ type: 'POPULATE', subtitles })}
        />
      ) : (
        <div className={cn.listContainer}>
          <div>
            {getMarked(state)} / {state.size - getMarked(state)}
          </div>
          {[...state].map(([word, marked]) => (
            <div
              key={word}
              className={marked ? cn.marked : ''}
              onClick={() => dispatch({ type: 'TOGGLE_WORD', word })}
            >
              {word}
            </div>
          ))}
          <div>Actions</div>
        </div>
      )}
    </div>
  );
};

export default AddSubtitlesRoute;
