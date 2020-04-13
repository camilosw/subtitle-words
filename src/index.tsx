import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/normalize.css';
import 'styles/index.css';
import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';
import { Provider } from 'react-redux';
import store from 'store/store';
import { AuthProvider, AuthButton } from 'modules/firebase';

const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <AuthButton />
          <Routes />
        </Container>
      </BrowserRouter>
    </Provider>
  </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
