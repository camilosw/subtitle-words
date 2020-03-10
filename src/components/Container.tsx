import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .container {
    max-width: 980px;
    margin-left: auto;
    margin-right: auto;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className={cn.container}>
      <h1>Movies and TV Shows Vocabulary</h1>
      {children}
    </div>
  );
};

export default Container;
