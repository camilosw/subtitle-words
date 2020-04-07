import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/normalize.css';
import 'styles/index.css';
import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';
import { Provider } from 'react-redux';
import store from 'store/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <Routes />
      </Container>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
