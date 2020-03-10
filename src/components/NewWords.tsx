import React, { useReducer } from 'react';
import { subTitleType } from 'subtitle';
import preprocessor from 'text-preprocessor';
import AddSubtitles from 'components/AddSubtitles';
// TODO
// https://www.npmjs.com/package/extract-lemmatized-nonstop-words
// https://www.npmjs.com/package/text-miner
// https://www.npmjs.com/package/keyword-extractor

interface Word {
  word: string;
  marked: boolean;
}

interface ActionPopulate {
  type: 'POPULATE';
  payload: Map<string, Word>;
}

interface ActionToggleWord {
  type: 'TOGGLE_WORD';
  word: string;
}

type Action = ActionPopulate | ActionToggleWord;

const reducer = (state: Map<string, Word>, action: Action) => {
  switch (action.type) {
    case 'POPULATE':
      return action.payload;

    case 'TOGGLE_WORD': {
      const word = state.get(action.word);
      if (word) {
        word.marked = !word.marked;
        state.set(action.word, word);
        return new Map([...state]);
      }
      return state;
    }

    default:
      return state;
  }
};

const NewWords = () => {
  const [words, setWords] = useReducer(reducer, new Map<string, Word>());

  const handleOnAdded = (AddedSubtitles: subTitleType[]) => {
    const text = AddedSubtitles.map(subtitle => subtitle.text).join(' ');
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
      .map(word => ({ word, marked: false }))
      .reduce((accum, word) => {
        accum.push([word.word, word]);
        return accum;
      }, [] as [string, Word][]);
    setWords({ type: 'POPULATE', payload: new Map(uniqueWords) });
  };

  return (
    <div>
      <AddSubtitles onAdded={handleOnAdded} />
      {!!words && (
        <>
          <div>Count: {words.size}</div>
          {[...words].map(([key, { word, marked }]) => (
            <div
              key={key}
              className={marked ? 'marked' : ''}
              onClick={() => setWords({ type: 'TOGGLE_WORD', word })}
            >
              {word}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NewWords;
