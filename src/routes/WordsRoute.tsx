import React, { useState } from 'react';
import { css } from 'astroturf';
import Word from 'components/Word';
import { WordsState } from './MainRoute';

const cn = css`
  .title {
    font-size: 1.75rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
  .action {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .sort {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
  .sortAction {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    cursor: pointer;
    &.active,
    &:hover {
      color: var(--primary);
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  type: 'known' | 'unknown';
  words: WordsState;
  toggleWord(word: string): void;
}

const WordsRoute = ({ type = 'unknown', words, toggleWord }: Props) => {
  const [sortRandom, setSortRandom] = useState(false);
  const {
    new: [...newWords],
    known: [...knownWords],
  } = words;

  const currentWords = type === 'known' ? knownWords : newWords;
  if (type === 'unknown' && sortRandom) {
    currentWords.sort(() => Math.random() - 0.5);
  } else {
    currentWords.sort();
  }

  return (
    <div>
      <h1 className={cn.title}>{type === 'known' ? 'Known ' : 'New '}words</h1>
      {type === 'unknown' && (
        <div className={cn.sort}>
          sort:
          <span
            onClick={() => setSortRandom(false)}
            className={[cn.sortAction, !sortRandom && cn.active]
              .filter(Boolean)
              .join(' ')}
          >
            alphabetical
          </span>{' '}
          |{' '}
          <span
            onClick={() => setSortRandom(true)}
            className={[cn.sortAction, sortRandom && cn.active]
              .filter(Boolean)
              .join(' ')}
          >
            random
          </span>
        </div>
      )}
      {currentWords.map(word => (
        <Word
          key={word}
          word={word}
          actions={
            <>
              <div>|</div>
              {type === 'known' ? (
                <div onClick={() => toggleWord(word)} className={cn.action}>
                  set new
                </div>
              ) : (
                <div onClick={() => toggleWord(word)} className={cn.action}>
                  learned
                </div>
              )}
            </>
          }
        />
      ))}
    </div>
  );
};

export default WordsRoute;
