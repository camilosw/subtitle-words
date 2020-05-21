import React, { useEffect, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { css } from 'astroturf';
import { useGetWords, useAddWords, useToggleWord } from 'modules/api';
import { useUser } from 'modules/firebase';
import Sidebar from './Sidebar';
import AddSubtitlesRoute from './AddSubtitlesRoute';
import WordsRoute from './WordsRoute';

const cn = css`
  .main {
    display: flex;
  }
  .sidebar {
    width: 12rem;
    background-color: #fff;
    margin-right: 0.5rem;
    padding: 1rem;
    align-self: flex-start;
    border-radius: 0.25rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 68px;
  }
  .content {
    flex: 1;
    background-color: #fff;
    margin-left: 0.5rem;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

export interface WordsState {
  new: Set<string>;
  known: Set<string>;
}

interface ActionPopulate {
  type: 'POPULATE';
  new: string[];
  known: string[];
}

interface ActionAddWords {
  type: 'ADD_WORDS';
  new: string[];
  known: string[];
}

interface ActionToggleWord {
  type: 'TOGGLE_WORD';
  word: string;
}

type Action = ActionPopulate | ActionAddWords | ActionToggleWord;

const reducer = (state: WordsState, action: Action) => {
  switch (action.type) {
    case 'POPULATE':
      return {
        new: new Set(action.new.sort()),
        known: new Set(action.known.sort()),
      };

    case 'ADD_WORDS':
      return {
        new: new Set([...state.new, ...action.new]),
        known: new Set([...state.known, ...action.known]),
      };

    case 'TOGGLE_WORD': {
      if (state.known.has(action.word)) {
        state.known.delete(action.word);
        state.new.add(action.word);
      } else {
        state.known.add(action.word);
        state.new.delete(action.word);
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

const initialState: WordsState = {
  new: new Set(),
  known: new Set(),
};

const MainRoute = () => {
  const [getWords, { data, loading }] = useGetWords();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useUser();
  const [addWordsToDb] = useAddWords();
  const [toggleWordDb] = useToggleWord();

  useEffect(() => {
    if (user) {
      getWords(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'POPULATE', new: data.new, known: data.known });
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  const toggleWord = async (word: string) => {
    if (user) {
      try {
        const moveTo = state.new.has(word) ? 'known' : 'new';
        await toggleWordDb(user.uid, word, moveTo);
        dispatch({ type: 'TOGGLE_WORD', word });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addWords = async (newWords: string[], knownWords: string[]) => {
    if (user) {
      try {
        await addWordsToDb(user.uid, { new: newWords, known: knownWords });
        dispatch({ type: 'ADD_WORDS', new: newWords, known: knownWords });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cn.main}>
      <aside className={cn.sidebar}>
        <Sidebar words={state} />
      </aside>
      <div className={cn.content}>
        <Switch>
          <Route path="/add-subtitles">
            <AddSubtitlesRoute words={state} addWords={addWords} />
          </Route>
          <Route path="/new">
            <WordsRoute words={state} type="unknown" toggleWord={toggleWord} />
          </Route>
          <Route path="/known">
            <WordsRoute words={state} type="known" toggleWord={toggleWord} />
          </Route>
          <Redirect from="/" to="/new" />
        </Switch>
      </div>
    </div>
  );
};

export default MainRoute;
