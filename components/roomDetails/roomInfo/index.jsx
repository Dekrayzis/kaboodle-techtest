import React from "react";
import styles from "./roominfo.module.scss";

const RoomInfo = ({ details }) => {
  const {
    name,
    type,
    max_occupancy,
    min_occupancy,
    available,
    facilities,
    price
  } = details;

  const roomName_type = name !== type ? `${name}, ${type}` : name;

  return (
    <div className={styles.roomInfo_roomBox}>
      <div className={styles.roomInfo_innercontent}>
        <header className={styles.roomInfo_header}>
          <h3>{roomName_type}</h3>
          {available && (
            <span style={{ color: `${available !== 0 ? "#00c300" : "red"}` }}>
              {available !== 0 ? `${available} Available` : "Sold out"}
            </span>
          )}
          {!price && !available && (
            <span style={{ color: "red"}}>
              Sold out
            </span>
          )}
        </header>
        <div className={styles.roomInfo_content}>
          <div className={styles.roomImg}>
            <img src="http://placehold.it/300x300" />
          </div>
          <div className={styles.roomDesc}>
            <ul className={styles.occupancyList}>
              <li>
                <span className={styles.roomDesc_label}>Max occupancy</span>
                <span className={styles.roomDesc_value}>
                  {max_occupancy} people
                </span>
              </li>
              <li>
                <span className={styles.roomDesc_label}>Min occupancy</span>
                <span className={styles.roomDesc_value}>
                  {min_occupancy} people
                </span>
              </li>
            </ul>

            {/* If this room type has facilities, render them. */}
            {facilities && facilities.length > 0 && (
              <div className={styles.facilityList}>
                <h2>Facilities</h2>
                <ul>
                  {facilities.map((elem, idx) => (
                    <li key={idx}>
                      <span className={styles.facility_label}>
                        {elem.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {price && (
              <div className={styles.priceRateBox}>
                <div>
                  <div className={styles.priceBox}>
                    <span className={styles.ratePrice}>                      
                      {Math.round(price?.price.substring(1))}
                    </span>
                    <span className={styles.currency}>
                      {price?.currency_iso_code} / night
                    </span>
                  </div>
                  <span className={styles.taxInfo}>
                    Taxes and all fees included
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
