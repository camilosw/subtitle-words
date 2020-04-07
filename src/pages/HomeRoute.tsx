import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

const HomeRoute = () => {
  const { newWords } = useSelector((state: RootState) => state.wordsSlice);

  console.log(newWords);

  return (
    <div>
      <Link to="/add-subtitles">Add subtitles</Link>
      {[...newWords].map(word => (
        <div key={word}>{word}</div>
      ))}
    </div>
  );
};

export default HomeRoute;
