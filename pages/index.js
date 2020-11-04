import { useEffect } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks"; // initial load
import { useLazyQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { withApollo } from "../libs/apollo";
import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_CODE,
} from "../gql/getCountries";


const Home = () => {
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
  } = useQuery(GET_COUNTRIES, {
    fetchPolicy: "no-cache",
  });

  const [getCountriesByCode] = useLazyQuery(GET_COUNTRIES_BY_CODE, {
    fetchPolicy: "no-cache",
  });

  const getCountries = (count) => {
    dataCountries &&
      dataCountries.countries.map(({ code }, index) => {
        if (index > count) return;
        const query = `
          {
            country(code: "${code}") {
              name
              native
              capital
              emoji
              currency
              languages {
                code
                name
              }
            }
          }
        `;
        const url = "https://countries.trevorblades.com/";
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ query }),
        };
        fetch(url, opts)
          .then((res) => res.json())
          .then(console.log)
          .catch(console.error);
      });
  };

  useEffect(() => {
    dataCountries && getCountries(4);
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
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {/* 1 API Call */}
          <button
            onClick={() =>
              getCountriesByCode({
                variables: {
                  countryCode: "BR",
                },
              })
            }
            className={styles.card}
          >
            1 api call
            {/* {
              data &&
              data.countries &&
              data.countries.map((c, i) => {
                if (error) return <h1>Error</h1>;
                if (loading) return <h1>Loading...</h1>;
                return <div key={i}>{c.name}</div>
                }
              )
            } */}
          </button>

          {/* 12 API Calls */}
          <button onClick={() => getCountries(12)} className={styles.card}>
            12 api calls
          </button>

          {/* 50 API Calls */}
          <button onClick={() => getCountries(50)} className={styles.card}>
            12 api calls
          </button>

          {/* 1 API Call + 100 dom events */}
          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          {/* 12 API Calls + 100 dom events */}
          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>

          {/* 50 API Calls + 100 dom events */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
