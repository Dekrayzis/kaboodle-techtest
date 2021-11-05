import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

//-- Components
import { RoomInfo, Loader } from "/components";

//-- Server config
import { server } from "/config";

//-- style
import styles from "/styles/Details.module.scss";

//-- Helper
import { merge } from "/helpers/func.helper";

const Rooms = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>KaBoodle technical test - rooms</title>
        <meta name="description" content="technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.accommodationDetails__room}>
        <div className={styles.accomodationDetails__roomsContainer}>
          {props.data.map((room, idx) => (
            <RoomInfo key={idx} details={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;


Rooms.propTypes = {
  data: PropTypes.array
};



//-- Server side rendering.
export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  const newId = parseInt(id);

  // Get the paths we want to pre-render based on posts
  const data = await (await fetch(`${server}/api/accommodation`)).json();
  const availabilityData = await (
    await fetch(`${server}/api/availability`)
  ).json();

  //-- Get selected resort
  const pageData = data.accommodations.find(
    (accomodation) => accomodation.id === newId
  );

  //-- Finds the id of two arrays and combines the related objects together.
  const allRooms = merge(pageData.rooms, availabilityData.rooms);

  return {
    props: {
      data: allRooms.length > 0 ? allRooms : pageData.rooms,
    },
  };
}

export async function getStaticPaths() {
  const data = await (await fetch(`${server}/api/accommodation`)).json();

  // Get the paths we want to pre-render based on posts
  const paths = data.accommodations.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
