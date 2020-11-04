import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { withApollo } from "../libs/apollo";
import { useQuery } from "@apollo/react-hooks"; // initial load
import {
  GET_COUNTRIES,
  GET_BRAZIL,
  GET_COUNTRIES_BY_CODE,
} from "../gql/getCountries";

import { useLazyQuery } from "@apollo/client";

const Home = () => {
  // const [countriesData, setCountriesData] = useState(0);

  // const [countriesData, setCountriesData] = useState(null);

  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
  } = useQuery(GET_COUNTRIES, {
    fetchPolicy: "no-cache",
  });

  // const [getCountries, { loading, error, data }] = useLazyQuery(GET_COUNTRIES, {
  //   fetchPolicy: "no-cache",
  // });

  // const [
  //   getCountriesTest,
  //   { loading: newLoad, error: newError, data: newData },
  // ] = useLazyQuery(GET_BRAZIL, {
  //   fetchPolicy: "no-cache",
  // });

  const [getCountriesByCode] = useLazyQuery(GET_COUNTRIES_BY_CODE, {
    fetchPolicy: "no-cache",
  });

  const getCountries = () => {
    dataCountries &&
      dataCountries.countries.map(({ code }, index) => {
        if (index > 4) return;
        console.log("code", code);
        getCountriesByCode({
          fetchPolicy: "no-cache",
          variables: {
            countryCode: code,
          },
        });
      });
  };

  // useEffect(() => {
  //   console.log('country data', data);
  // }, [data])

  useEffect(() => {
    // if (!data) {
    //   console.log('data effect')
    //   getCountries();
    //   getCountriesTest();
    // }

    // setCountriesData(dataCountries)
    dataCountries &&
      dataCountries.countries.map(({ code }, index) => {
        if (index > 4) return;
        console.log("code", code);
        getCountriesByCode({
          fetchPolicy: "no-cache",
          variables: {
            countryCode: code,
          },
        });
      });
    // const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CODE, {
    //   fetchPolicy: "no-cache",
    //   variables: {
    //     countryCode
    //   }
    // });
  }, [dataCountries]);

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
          <button onClick={() => getCountries()} className={styles.card}>
            12 api calls
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

          {/* 50 API Calls */}
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

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
