import React, { useEffect, useState } from "react";
import PrimaryButton from "./../buttons/PrimaryButton";
import styles from "./card.module.scss";
import { useRouter } from "next/router";
import StarRating from "../starRating/StarRating";
import { removeDuplicates } from "../../helpers/func.helper";

const initialRateData = { value: "0", currency: "GBP" };
const Card = ({ itemData }) => {
  const router = useRouter();
  const [rate, setRate] = useState(initialRateData);

  const { id, images, location, rooms, rating } = itemData;

  useEffect(() => {
    //-- Get the lowest value rate.
    const getLowestRate = () => {
      const pricerange = rooms?.map((room) => {
        if (room?.price) {
          return {
            value: Math.round(room?.price.price.substring(1)),
            currency: room?.price.currency_iso_code,
          };
        }
        return null;
      });

      const rateData = removeDuplicates(pricerange.filter((item) => !!item));
      setRate(rateData.length > 0 ? rateData[0] : initialRateData);
    };

    getLowestRate();
  }, []);

  const handle_OnClick = (evt) => {
    evt.preventDefault();
    router.push(`/accomodation/${id}`);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_wrapper}>
          <div className={styles.card_imgWrapper}>
            {images && (
              <img src={images[0].filename} alt={images[0].alt} width={260} />
            )}
          </div>
          <div className={styles.card_detailsWrapper}>
            <div className={styles.card_title}>
              <a className={styles.ellipsis}>{location?.name}</a>
            </div>
            <div className={styles.priceRate}>
              <div className={styles.cardPrice_details}>
                {rate.value > 0 ? (
                  <>
                    From
                    <span className={styles.card_price}>{rate.value}</span>
                    {rate.currency} / night
                  </>
                ) : (
                  <div className={styles.soldOut}>High Demand</div>
                )}
              </div>

              <div className={styles.cardBtn}>
                <PrimaryButton
                  label={rate.value > 0 ? "View rates" : "View availability"}
                  press={(evt) => handle_OnClick(evt)}
                />
              </div>
            </div>
            <div className={styles.cardAmenities}>
              <div className={styles.cardAmenities_destination}>
                <span className={styles.location}>
                  <StarRating rating={rating.label.slice(0, -1)} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;