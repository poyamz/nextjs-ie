import '../styles/globals.css';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../configureApolloClient';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withData(MyApp);
