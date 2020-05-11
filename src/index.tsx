import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/normalize.css';
import 'styles/index.css';
import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { AuthProvider } from 'modules/firebase';
import Header from 'components/Layout/Header';
import Main from 'components/Layout/Main';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <Header />
        <Main>
          <Routes />
        </Main>
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
