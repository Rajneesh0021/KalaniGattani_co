import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; 
import styles from './css/HomeSectionOne.module.css'; // Import CSS Module
import ServiceDescPopup from './ServiceDescPopup';
import LoginSignupPop from './LoginSignupPop';

const HomeSectionOne = () => {
  const popularServices = [
    { id: 1, img: './assets/Company+Inc.svg', text: 'Online Company Registration', description: 'Detailed information about Online Company Registration.' },
    { id: 2, img: './assets/trademark-registration.svg', text: 'Trademark Registration', description: 'Detailed information about Trademark Registration.' },
    { id: 3, img: './assets/Accounting+Book+Keeping.svg', text: 'Accounting and Book Keeping', description: 'Detailed information about Accounting and Book Keeping.' },
    { id: 4, img: './assets/Legal+Agreements.svg', text: 'Legal Agreement', description: 'Detailed information about Legal Agreement.' },
    { id: 5, img: './assets/GST+Registration.svg', text: 'GST Registration', description: 'Detailed information about GST Registration.' },
  ];

  const [selectedService, setSelectedService] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div className={styles.sectionOne}>
        <div className={styles.welcomeBox}>
          <FaSignInAlt className={styles.loginIcon} />
          <div className={styles.welcomeText}>
            <h3 className={styles.heading}>Welcome to Kalani Gattani & Company</h3>
            <p className={styles.subHeading}>To get full access to the features</p>
          </div>
          <button className={styles.loginButton } onClick={() => setShowLogin(!showLogin)}>Login / Signup</button>
        </div>

        <h3 className={styles.exploreHeading}>Explore Services</h3>
        <div className={styles.exploreBoxes}>
          <div className={styles.box}>
            <Link to='/exservices?type=individual'>
              <img src="./assets/Individual.svg" alt="For Individual" className={styles.boxImage} />
              <p className={styles.boxText}>For Individual</p>
            </Link>
          </div>

          <div className={styles.box}>
            <Link to='/exservices?type=business'>
              <img src="./assets/Business.svg" alt="For Business" className={styles.boxImage} />
              <p className={styles.boxText}>For Business</p>
            </Link>
          </div>
        </div>

        <div className={styles.popularServicesContainer}>
          <h3 className={styles.popularHeading}>Popular Services</h3>
          <Link to='/exservices?type=individual' className={styles.viewAllLink}>View All</Link>
        </div>

        <div className={styles.serviceBoxes}>
          {popularServices.map((service) => (
            <div className={styles.serviceBox} key={service.id} onClick={() => handleServiceClick(service)}>
              <img src={service.img} alt={service.text} className={styles.serviceBoxImage} />
              <p className={styles.serviceBoxText}>{service.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.needExpertsContainer}>
          <h3 className={styles.needExpertsHeading}>
            Need Experts? <span className={styles.needExpertsText}>Get a call in the next 5 minutes</span>
          </h3>

          <div className={styles.expertsLayout}>
            <div className={styles.fullHeightBox}>
              <img src="./assets/expert.svg" alt="Expert Image" className={styles.image} />
              <p className={styles.text}>Talk to Lawyer</p>
            </div>
            <div className={styles.halfWidthBoxes}>
              <div className={styles.halfWidthBox}>
                <img src="./assets/expert.svg" alt="Expert" className={styles.imageHalf} />
                <p className={styles.text}>Talk to CA</p>
              </div>
              <div className={styles.halfWidthBox}>
                <img src="./assets/expert.svg" alt="Expert" className={styles.imageHalf} />
                <p className={styles.text}>Talk to CS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLogin && (
        <LoginSignupPop/>
      )}
      {selectedService && (
        <ServiceDescPopup selectedService={selectedService} setSelectedService={setSelectedService} />
      )}
    </>
  );
}

export default HomeSectionOne;
