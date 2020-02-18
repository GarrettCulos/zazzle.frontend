import ApolloClient from 'apollo-boost';
import { environment } from '@environment/environment';

const client = new ApolloClient({
  uri: environment.graphqlEndpoint,
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        'x-access-token': token ? token : ''
      }
    });
  }
});
export default client;
