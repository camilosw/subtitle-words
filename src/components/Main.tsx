import React from 'react';
import NewWords from './NewWords';

const Main = () => {
  return (
    <div className="main">
      <h1>Movies and TV Shows Vocabulary</h1>
      <div className="content">
        <div className="column">
          <NewWords />
        </div>
        <div className="column">Active</div>
        <div className="column">Full</div>
      </div>
    </div>
  );
};

export default Main;
