import React from 'react';
import { css } from 'astroturf';
import Container from './Container';

const cn = css`
  .main {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;
interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <main className={cn.main}>
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
