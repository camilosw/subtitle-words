import React from 'react';
import { css } from 'astroturf';
import Word from 'components/Word';
import { WordsState } from './MainRoute';

const cn = css`
  .title {
    font-size: 1.75rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
`;

interface Props {
  type: 'known' | 'unknown';
  words: WordsState;
  toggleWord(word: string): void;
}

const WordsRoute = ({ type = 'unknown', words, toggleWord }: Props) => {
  const { new: newWords, known: knownWords } = words;

  const currentWords = type === 'known' ? knownWords : newWords;

  return (
    <div>
      <h1 className={cn.title}>{type === 'known' ? 'Known ' : 'New '}words</h1>
      {[...currentWords].map(word => (
        <Word
          key={word}
          word={word}
          actions={
            <>
              <div>|</div>
              {type === 'known' ? (
                <div onClick={() => toggleWord(word)}>set new</div>
              ) : (
                <div onClick={() => toggleWord(word)}>learned</div>
              )}
            </>
          }
        />
      ))}
    </div>
  );
};

export default WordsRoute;
