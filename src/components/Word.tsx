import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .word {
    display: flex;
    justify-content: space-between;
    margin: 0 -1rem;
    padding: 0 1rem;
    .actions {
      display: none;
    }
    &:hover {
      background-color: var(--grey-light);
      .actions {
        display: inherit;
      }
    }
  }
  .text {
    flex: 1;
    padding: 0.125rem 0;
  }
  .pointer {
    cursor: pointer;
  }
  .actions {
    display: flex;
    align-items: flex-end;
    font-size: 0.75rem;
    & > * {
      margin-left: 0.25rem;
    }
  }
`;

interface Props {
  word: string;
  className?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
}

const Word = ({ word, className, actions, onClick }: Props) => {
  return (
    <div className={[cn.word, className].join(' ')}>
      <div
        className={[cn.text, !!onClick && cn.pointer].filter(Boolean).join(' ')}
        onClick={onClick}
      >
        {word}
      </div>
      <div className={cn.actions}>
        <a
          href={`https://www.wordreference.com/es/translation.asp?tranword=${word.toLowerCase()}`}
          target="_black"
          rel="noopener noreferrer"
          className={cn.wordReference}
        >
          WordReference.com
        </a>
        {actions}
      </div>
    </div>
  );
};

export default Word;
