import React from "react";
import styles from "./pageheader.module.scss";
import Link from "next/link";

const PageHeader = () => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageHeader__container}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <img src="/images/logo.png" alt="logo" width={50} height={50} />
            </div>
          </a>
        </Link>
        <div className={styles.upperHeader}></div>
        <div className={styles.lowerHeader}>
          <ul className={styles.menu_nav}>
            <li className={styles.menu_nav__item}>Find & reserve</li>
            <li className={styles.menu_nav__item}>Special offers</li>
            <li className={styles.menu_nav__item}>Vacations</li>
            <li className={styles.menu_nav__item}>Our brands</li>
            <li className={styles.menu_nav__item}>About us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
