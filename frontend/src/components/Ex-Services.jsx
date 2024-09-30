import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Icon for arrow
import ServiceDescPopup from './ServiceDescPopup';
import styles from './css/ExServices.module.css'; // Import CSS Module
import axios from 'axios'; // Import axios for API requests
import { fetchData } from '../services/apiServices';

const ExServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [services, setServices] = useState([]); // State to hold fetched services
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Get the current 'type' from the URL params (either 'individual' or 'business')
  const type = searchParams.get('type') || 'individual';

  // Fetch services from the API
  const fetchServices = async () => {
    setLoading(true); // Set loading state to true before making the request
    try {
      const response = await fetchData('/service'); // Use your service function
      setServices(response.services); // Assuming the API returns data in this format
      setLoading(false); // Set loading state to false when data is loaded
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services'); // Set error state
      setLoading(false); // Stop the loading animation
    }
  };

  useEffect(() => {
    fetchServices();
  }, [type]); // Fetch services when the type changes

  useEffect(() => {
    // Filter services based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const handleButtonClick = (selectedType) => {
    setSearchParams({ type: selectedType });
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div>Loading services...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

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
            <img src={service.img} alt={service.name} />
            <p>{service.name}</p>
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
