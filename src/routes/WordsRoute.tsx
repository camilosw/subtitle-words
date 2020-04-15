import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { css } from 'astroturf';
import Word from 'components/Word';

const cn = css`
  .title {
    font-size: 1.75rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
`;
const words = [
  'another',
  'test',
  'consequuntur',
  'omnis',
  'possimus',
  'reiciendis',
  'quia',
  'fugiat',
  'est',
  'dolor',
  'cumque',
  'dolores',
  'at',
  'quam',
  'ad',
  'veniam',
  'labore',
  'nulla',
  'qui',
  'rerum',
  'voluptas',
  'nobis',
  'eos',
  'eligendi',
  'et',
  'suscipit',
  'vel',
  'quisquam',
  'vero',
  'dolores',
];

interface Props {
  type: 'known' | 'unknown';
}

const WordsRoute = ({ type = 'unknown' }: Props) => {
  const { newWords } = useSelector((state: RootState) => state.wordsSlice);

  console.log(newWords);

  return (
    <div>
      <h1 className={cn.title}>{type === 'known' ? 'Known ' : 'New '}words</h1>
      {words.map(word => (
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
