import React, { useContext } from "react";
import Head from "next/head";

//-- Components
import { Map, RoomHeader } from "../../../components";

//-- Server config
import { server } from "../../../config";

//-- style
import styles from "../../../styles/Details.module.scss";
import Modal from "./../../../components/layout/modal";

//-- Context
import { ModalContext } from './../../../context/modalContext';

const Accommodation = (props) => {
  const [toggleModal, setToggleModal] = useContext(ModalContext);
  const {
    id,
    description,
    type,
    address_1,
    address_2,
    address_3,
    postcode,
    images,
    country,
    rating,
    location,
    facilities,
  } = props.data;

  const headerDetails = {
    id,
    address: {
      street: address_1,
      providence: address_2,
      city: address_3,
      postcode,
      country: country.name,
    },
    name: location.name,
    type: type.name,
    rating: rating.label.slice(0, -1),
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>KaBoodle technical test - accomodation</title>
          <meta name="description" content="technical test" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.accommodationDetails}>
          <div className={styles.accomodationDetails_container}>
            <RoomHeader details={headerDetails} />
            <section className={styles.resortOverview}>
              <div className={styles.resortImage}>
                {images && (
                  <img
                    src={images[0].filename}
                    alt={images[0].alt}
                    width={520}
                    height={420}
                  />
                )}
              </div>
              <div className={styles.resortDescription}>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </section>

            <section className={styles.resortFacilities}>
              <h2>Facilities</h2>
              <ul className={styles.facilityList}>
                {facilities.map(({ label }, idx) => (
                  <li key={idx}>{label}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
      > 
        <Map location={location} accommodationName={location.name} />
      </Modal>
    </>
  );
};

export default Accommodation;


//-- Server side rendering.
export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  // Get the paths we want to pre-render based on posts
  const data = await (await fetch(`${server}/api/accommodation`)).json();
  const pageData = data.accommodations.find(
    (accomodation) => accomodation.id === parseInt(id)
  );

  return {
    props: {
      data: pageData,
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
