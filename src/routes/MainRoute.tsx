import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { css } from 'astroturf';
import { useGetWords } from 'modules/api';
import { useDispatch } from 'react-redux';
import { useUser } from 'modules/firebase';
import { addWords } from 'store';
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

const MainRoute = () => {
  const [getWords, { data, loading }] = useGetWords();
  const dispatch = useDispatch();
  const user = useUser();

  useEffect(() => {
    if (user) {
      getWords(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      dispatch(addWords(data));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={cn.main}>
      <aside className={cn.sidebar}>
        <Sidebar />
      </aside>
      <div className={cn.content}>
        <Switch>
          <Route path="/add-subtitles">
            <AddSubtitlesRoute />
          </Route>
          <Route path="/new">
            <WordsRoute type="unknown" />
          </Route>
          <Route path="/known">
            <WordsRoute type="known" />
          </Route>
          <Redirect from="/" to="/new" />
        </Switch>
      </div>
    </div>
  );
};

export default MainRoute;