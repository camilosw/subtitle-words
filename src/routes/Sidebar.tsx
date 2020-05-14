import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'astroturf';
import ButtonLink from 'components/UI/ButtonLink';
import { WordsState } from './MainRoute';

const cn = css`
  .addButtonContainer {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.8;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
  .nav {
    display: flex;
    flex-direction: column;
    & > * {
      display: flex;
      justify-content: space-between;
      margin: 0.25rem 0;
      opacity: 0.75;
    }
    :global(.active) {
      color: var(--primary);
    }
  }
  .badge {
    background-color: var(--secondary);
    font-size: 0.675rem;
    font-weight: bold;
    padding: 0.125rem 0.5rem;
    border-radius: 0.85rem;
  }
`;

interface Props {
  words: WordsState;
}

const Sidebar = ({ words }: Props) => {
  const { new: newWords, known: knownWords } = words;

  return (
    <div className={cn.sidebar}>
      <h2 className={cn.title}>Words</h2>
      <nav className={cn.nav}>
        <div>
          <NavLink to="/new">New</NavLink>
          <span className={cn.badge}>{newWords.size}</span>
        </div>
        <div>
          <NavLink to="/known">Known</NavLink>
          <span className={cn.badge}>{knownWords.size}</span>
        </div>
      </nav>
      <div className={cn.addButtonContainer}>
        <ButtonLink className={cn.addButton} to="/add-subtitles">
          Add subtitles
        </ButtonLink>
      </div>
    </div>
  );
};

export default Sidebar;
