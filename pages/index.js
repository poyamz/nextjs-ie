import { useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks'; // initial load
import { useLazyQuery } from '@apollo/client';
import styles from '../styles/Home.module.css';
import { withApollo } from '../libs/apollo';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CODE } from '../gql/getCountries';

const Home = () => {
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
  } = useQuery(GET_COUNTRIES, {
    fetchPolicy: 'no-cache',
  });

  const [getCountriesByCode] = useLazyQuery(GET_COUNTRIES_BY_CODE, {
    fetchPolicy: 'no-cache',
  });

  const getQueries = (count) => {
    Array.apply(null, Array(count)).map(() => {
      const query = `
          {
            strain(delay: 1) {
              id
              name
              desc
              race
              flavors
            }
          }
        `;
      const url = 'https://strains-graph-api.herokuapp.com/graphql';
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'DhMA9db',
        },
        cache: 'no-store',
        body: JSON.stringify({ query }),
      };
      fetch(url, opts)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            for (let i = 0; i < 200; i++) {
              document.body.appendChild(document.createElement('div'));
            }
          }, 750);
          console.log('data', data);
        })
        .catch(console.error);
    });
  };

  useEffect(() => {
    dataCountries && getQueries(4);
  }, [dataCountries]);

  if (errorCountries) return <h1>Error loading countries</h1>;
  if (loadingCountries) return <h1>Loading countries...</h1>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {/* 1 API Call */}
          <button
            onClick={() =>
              getCountriesByCode({
                variables: {
                  countryCode: 'BR',
                },
              })
            }
            className={styles.card}
          >
            1 api call
          </button>

          {/* 12 API Calls */}
          <button onClick={() => getQueries(12)} className={styles.card}>
            12 api calls
          </button>

          {/* 50 API Calls */}
          <button onClick={() => getQueries(50)} className={styles.card}>
            50 api calls
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
