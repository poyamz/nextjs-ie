import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { withApollo } from '../libs/apollo';
// import { useQuery } from '@apollo/react-hooks';
import { GET_COUNTRIES } from '../gql/getCountries';

import { useLazyQuery } from "@apollo/client";

const Home = () => {

  const [
    getCountries, 
    { loading, error, data }
  ] = useLazyQuery(GET_COUNTRIES, {fetchPolicy: 'no-cache'});

  // const { loading, error, data } = useQuery(ALL_CHARACTERS);
  // if (error) return <h1>Error</h1>;
  // if (loading) return <h1>Loading...</h1>;

  console.log('data', data);

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
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <button onClick={() => getCountries()} className={styles.card}>
            Single api call
            {
              data &&
              data.countries &&
              data.countries.map((c, i) => {
                if (error) return <h1>Error</h1>;
                if (loading) return <h1>Loading...</h1>;
                return <div key={i}>{c.name}</div>
                }
              )
            }
          </button>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export default withApollo({ ssr: true })(Home);