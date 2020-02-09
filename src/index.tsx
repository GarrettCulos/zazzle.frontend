import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { environment } from '@environment/environment';
import { ApolloProvider } from '@apollo/react-hooks';
import store from '@store';

import './index.scss';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: environment.graphqlEndpoint
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
