import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Icon for arrow
import ServiceDescPopup from './ServiceDescPopup';
import styles from './css/ExServices.module.css'; // Import CSS Module
import { individual, business } from '../data/data';

const ExServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  // Get the current 'type' from the URL params (either 'individual' or 'business')
  const type = searchParams.get('type') || 'individual'; 

  const services = type === 'individual' ? individual : business;

  const handleButtonClick = (selectedType) => {
    setSearchParams({ type: selectedType });
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // Filter services based on the search query and type
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = services.filter(service =>
      service.text.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

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
          <input
            type="text"
            placeholder="Search services..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className={styles.servicesGrid}>
        {filteredServices.map((service) => (
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
