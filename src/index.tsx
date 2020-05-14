import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/normalize.css';
import 'styles/index.css';
import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'modules/firebase';
import Header from 'components/Layout/Header';
import Main from 'components/Layout/Main';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Main>
        <Routes />
      </Main>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
