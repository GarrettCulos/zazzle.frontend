import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client';
import { environment } from '@environment/environment';

const httpLink = createHttpLink({ uri: environment.graphqlEndpoint });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      'x-access-token': token ? token : ''
    }
  });

  return forward(operation);
});
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});
