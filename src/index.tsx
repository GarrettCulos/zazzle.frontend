import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHocProvider } from '@apollo/react-components';
import { client } from '@gql';
import store from '@store';

import './index.scss';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
const AppRoot = () => (
  // this HocProvider needs to be removed. HACK to get the CRA to compile
  <ApolloHocProvider client={client as any}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </ApolloHocProvider>
);

render(<AppRoot />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
