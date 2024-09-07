import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'next/link';
import styles from './css//Empty.module.css';  // Import CSS Module

const Empty = ({ Title, desc, btnText, imgPath, btnlink }) => {
  return (
    <>
      <div className={styles.imageSection}>
        <img src={imgPath} alt="Not found" className={styles.image} />
      </div>

      <h1 className={styles.titleMiddle}>{Title}</h1>
      <p className={styles.noServicesMessage}>{desc}</p>

      <Link to={btnlink} className={styles.exploreButton}>
        <span className={styles.buttonText}>{btnText}</span>
        <FaArrowRight />
      </Link>
    </>
  );
};

export default Empty;
