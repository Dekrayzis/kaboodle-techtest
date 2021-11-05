import React, { useContext } from "react";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";

//-- Components
import { Badge, PrimaryButton, StarRating } from "../../";

//-- Style
import styles from "./roomHeader.module.scss";
import { ModalContext } from "../../../context/modalContext";

const RoomHeader = ({ details }) => {
  const router = useRouter();
  const [toggleModal, setToggleModal] = useContext(ModalContext);

  const { name, type, rating, id } = details;
  const { street, providence, city, country } = details.address;

  const handle_OnNavClick = (evt) => {
    evt.preventDefault();
    router.push(`/accomodation/${id}/rooms`);
  };

  return (
    <header className={styles.accommodation_header}>
      <div className={styles.header_content}>
        <div className={styles.sectionHeaderMain}>
          <div className={styles.resortNameWrapper}>
            <Badge label={type} />
            <h1 className={styles.resortName}>{name}</h1>
            <StarRating rating={rating} />
          </div>

          <div className={styles.address} onClick={() => setToggleModal(!toggleModal)}>
            <div className={styles.btnMapLink}>
              <MdLocationOn />
              <span className={styles.streeAddress}>{street},</span>
              {providence && (
                <span className={styles.province}>{providence},</span>
              )}
              {city && <span className={styles.city}>{city},</span>}
              <span className={styles.city}>{country}</span>
            </div>
          </div>
        </div>

        <div className={styles.leadPrice}>
          <div className={styles.bookingWrapper}>
            <PrimaryButton
              label="Choose a room"
              press={(evt) => handle_OnNavClick(evt)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
