import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/normalize.css';
import 'styles/index.css';
import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';

const App = () => (
  <BrowserRouter>
    <Container>
      <Routes />
    </Container>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
