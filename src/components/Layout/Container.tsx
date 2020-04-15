import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .container {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className={cn.container}>{children}</div>;
};

export default Container;
