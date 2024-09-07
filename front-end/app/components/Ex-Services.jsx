import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Icon for arrow
import ServiceDescPopup from './ServiceDescPopup';
import styles from './css/ExServices.module.css'; // Import CSS Module

const ExServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState(null);

  // Get the current 'type' from the URL params (either 'individual' or 'business')
  const type = searchParams.get('type') || 'individual'; 

  const individual = [
    { img: './assets/individual.svg', text: 'PAN Number', _id: '1', description: 'Details about PAN Number service...' },
    { img: './assets/individual.svg', text: 'Aadhaar Card', _id: '2', description: 'Details about Aadhaar Card service...' },
    { img: './assets/individual.svg', text: 'PAN Number', _id: '1', description: 'Details about PAN Number service...' },
    { img: './assets/individual.svg', text: 'Aadhaar Card', _id: '2', description: 'Details about Aadhaar Card service...' },
    { img: './assets/individual.svg', text: 'PAN Number', _id: '1', description: 'Details about PAN Number service...' },
    { img: './assets/individual.svg', text: 'Aadhaar Card', _id: '2', description: 'Details about Aadhaar Card service...' },
    { img: './assets/individual.svg', text: 'PAN Number', _id: '1', description: 'Details about PAN Number service...' },
    { img: './assets/individual.svg', text: 'Aadhaar Card', _id: '2', description: 'Details about Aadhaar Card service...' },
    // Additional items...
  ];

  const business = [
    { img: './assets/business.svg', text: 'GST Registration', _id: '1', description: 'Details about GST Registration service...' },
    { img: './assets/business.svg', text: 'Company Incorporation', _id: '2', description: 'Details about Company Incorporation service...' },
    // Additional items...
  ];

  const handleButtonClick = (selectedType) => {
    setSearchParams({ type: selectedType });
  };

  const services = type === 'individual' ? individual : business;

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className={styles.sectionOne}>
      <div className={styles.header}>
        <div>
          <button
            className={`${styles.button} ${type === 'individual' ? styles.buttonActive : ''}`}
            onClick={() => handleButtonClick('individual')}
          >
            Individual
          </button>
          <button
            className={`${styles.button} ${type === 'business' ? styles.buttonActive : ''}`}
            onClick={() => handleButtonClick('business')}
          >
            Business
          </button>
        </div>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search services..." className={styles.searchInput} />
        </div>
      </div>
      <hr />
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div
            key={service._id}
            className={styles.serviceCard}
            onClick={() => handleCardClick(service)}
          >
            <img src={service.img} alt={service.text} />
            <p>{service.text}</p>
            <FaArrowRight className={styles.arrowIcon} />
          </div>
        ))}
      </div>

      {/* Popup for service details */}
      {selectedService && (
        <ServiceDescPopup selectedService={selectedService} setSelectedService={setSelectedService} />
      )}
    </div>
  );
};

export default ExServices;
