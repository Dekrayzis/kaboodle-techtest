import React, { useEffect, useState } from "react";
import Head from "next/head";

//-- Components
import { Card, DropDown, Pagination } from "../components";

//-- Helper functions
import {
  getAccommodationTypes,
  getAccommodations,
  filterAccommodations,
} from "../helpers/api-helper";

//-- Style
import styles from "/styles/Home.module.scss";

export default function Home() {
  let howManyPages;

  //-- Listings
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);

  //-- Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  //-- Loading
  const [loading, setLoading] = useState(false);

  //-- Filter parameters
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const results = await getAccommodations();
        const resultTypes = await getAccommodationTypes();

        setAccommodations(results);
        setAccommodationTypes(resultTypes);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onHandle_AccommodateTypeChange = async (value) => {
    setLoading(true);

    try {
      const results =
        value !== ""
          ? await filterAccommodations(value)
          : await getAccommodations();
      setAccommodations(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    setTypeFilter(value);
  };

  if (loading && accommodations.length === 0) {
    return <h2>Loading...</h2>;
  }

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = accommodations.slice(indexOfFirstPost, indexOfLastPost);
  howManyPages = Math.ceil(accommodations.length / postsPerPage);

  return (
    <div className={styles.container}>
      <Head>
        <title>KaBoodle technical test</title>
        <meta name="description" content="Created with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.properties}>
          <div className={styles.properties__wrapper}>
            <h3 className={styles.properties__title}>
              Stay in The Center of it All
            </h3>
            <p className={styles.properties__description}>
              Immerse yourself at these centrally located&nbsp;
              {typeFilter !== "" ? typeFilter : "place"}s.
            </p>
          </div>
        </div>

        <div className={styles.topToolBar}>
          <div className={styles.topToolBar_left}>
            <DropDown
              name="types"
              label="Accommodation Type"
              blankFirstOption
              onChange={(val) => onHandle_AccommodateTypeChange(val)}
              options={accommodationTypes}
            />
          </div>
          <div className={styles.topToolBar_right} />
        </div>

        <div className={styles.mainContent}>
          {currentPosts.map((item) => (
            <Card key={item.id} itemData={item} />
          ))}

          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}
