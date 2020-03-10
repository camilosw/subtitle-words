import React from 'react';
import { Link } from 'react-router-dom';

const HomeRoute = () => {
  return (
    <div>
      <Link to="/add-subtitles">Add subtitles</Link>
    </div>
  );
};

export default HomeRoute;
