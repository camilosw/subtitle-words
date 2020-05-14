import React, { useReducer } from 'react';
import { subTitleType } from 'subtitle';
import preprocessor from 'text-preprocessor';
import { useHistory } from 'react-router';
import { css } from 'astroturf';
import { useUser } from 'modules/firebase';
import AddSubtitles from 'components/AddSubtitles';
import Word from 'components/Word';
import Button from 'components/UI/Button';
import { WordsState } from './MainRoute';

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
  subtitles: [string, boolean][];
}

interface ActionToggleWord {
  type: 'TOGGLE_WORD';
  word: string;
}

type Action = ActionPopulate | ActionToggleWord;

const reducer = (state: Map<string, boolean>, action: Action) => {
  switch (action.type) {
    case 'POPULATE':
      return new Map(action.subtitles);

    case 'TOGGLE_WORD': {
      const marked = state.get(action.word);
      state.set(action.word, !marked);
      return new Map([...state]);
    }

    default:
      return state;
  }
};

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
    .sort();
  return uniqueWords;
};

const getMarked = (words: Map<string, boolean>) => {
  return [...words].filter(word => word[1]).length;
};

interface Props {
  words: WordsState;
  addWords(newWords: string[], knownWords: string[]): Promise<void>;
}

const AddSubtitlesRoute = ({ words, addWords }: Props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, new Map<string, boolean>());
  const user = useUser();
  const storeWords = words;
  const savedWords = [...storeWords.new, ...storeWords.known];

  const handleFinish = async () => {
    if (user) {
      try {
        const newWords = [...state]
          .filter(([, marked]) => marked)
          .map(([word]) => word);
        const knownWords = [...state]
          .filter(([, marked]) => !marked)
          .map(([word]) => word);
        await addWords(newWords, knownWords);
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddSubtitles = (subtitles: subTitleType[]) => {
    const subtitleWords = extractWords(subtitles);
    const newWords = subtitleWords
      .filter(word => !savedWords.includes(word))
      .map(word => [word, false] as [string, boolean]);
    dispatch({ type: 'POPULATE', subtitles: newWords });
  };

  return (
    <div>
      {state.size === 0 ? (
        <AddSubtitles onAdded={handleAddSubtitles} />
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
