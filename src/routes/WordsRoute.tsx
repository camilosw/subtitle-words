import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { css } from 'astroturf';
import Word from 'components/Word';

const cn = css`
  .title {
    font-size: 1.75rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
`;

interface Props {
  type: 'known' | 'unknown';
}

const WordsRoute = ({ type = 'unknown' }: Props) => {
  const { new: newWords, known: knownWords } = useSelector(
    (state: RootState) => state.wordsSlice,
  );

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
              {type === 'known' ? <div>set new</div> : <div>learned</div>}
            </>
          }
        />
      ))}
    </div>
  );
};

export default WordsRoute;
