import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

export const SERVER = 'https://us-central1-pubs-nearby.cloudfunctions.net/graphql';

const httpLink = new HttpLink({
  fetch,
  uri: SERVER,
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
