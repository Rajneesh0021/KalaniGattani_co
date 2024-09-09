import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Empty from '../components/Empty';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; 
import { FaAngleRight,FaRegComment } from "react-icons/fa";

const ServicesContainer = styled.div`
  padding: 20px 0;
`;

const PageTitle = styled.h3`
  text-align: left;
  margin-top: 30px;
`;

const SectionWrapper = styled.div`
  margin-top: 2em;
  padding: 2em;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
`;

const Btnwrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 500px) {
    gap: 5px;
  }
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
`;

const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const RegisteredServiceItem = styled.div` 
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  padding: 1em;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
  text-decoration: none; /* Remove link underline */
  color: inherit; /* Ensure text color matches the theme */
 
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ArrowIcon = styled(Link)`
  font-size: 24px;
  align-self: center;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border: none;

  &:nth-child(1) {
    background-color: #3e19e2;
    color: white;
  }

  &:nth-child(2) {
    background-color: #3e19e2;
    color: white;
  }
`;

const Services = () => {
  const { isLoggedIn } = useContext(AuthContext); // Use the context
  const [registeredServices, setRegisteredServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ongoing');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('registeredServices'));
    if (storedServices) {
      setRegisteredServices(storedServices);
      setFilteredServices(storedServices.filter(service => service.status === 'ongoing')); // Default to "Ongoing"
    }
  }, []);

  useEffect(() => {
    let services = registeredServices.filter(service => service.status === activeFilter);

    if (searchTerm) {
      services = services.filter(
        (service) =>
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(services);
  }, [activeFilter, searchTerm, registeredServices]);
  return (
    <ServicesContainer>
      <PageTitle>My Services</PageTitle>
      <SectionWrapper>
        {isLoggedIn && (
          <>
          <Btnwrapper>
            <ButtonGroup>
              <FilterButton
                active={activeFilter === 'ongoing'}
                onClick={() => setActiveFilter('ongoing')}
              >
                Ongoing ({registeredServices.filter(service => service.status === 'ongoing').length})
              </FilterButton>
              <FilterButton
                active={activeFilter === 'renewal'}
                onClick={() => setActiveFilter('renewal')}
              >
                Renewal ({registeredServices.filter(service => service.status === 'renewal').length})
              </FilterButton>
              <FilterButton
                active={activeFilter === 'completed'}
                onClick={() => setActiveFilter('completed')}
              >
                Completed ({registeredServices.filter(service => service.status === 'completed').length})
              </FilterButton>
              <FilterButton
                active={activeFilter === 'closed'}
                onClick={() => setActiveFilter('closed')}
              >
                Closed ({registeredServices.filter(service => service.status === 'closed').length})
              </FilterButton>
            </ButtonGroup>
            <SearchBar
              type="text"
              placeholder="Search by service name or ticket ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Btnwrapper>
          <hr />
          </>
        )}
        
        

        {isLoggedIn && filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <RegisteredServiceItem key={index} >
              <ServiceHeader>
                <div>
                  <strong>{service.serviceName}</strong>
                  <p>Ticket No. <strong>{service.ticketID}</strong></p>
                </div>
                <ArrowIcon to={`/ticket-status/${service.ticketID}`}><FaAngleRight/></ArrowIcon>
              </ServiceHeader>

              <ServiceDetails>
                <StatusInfo>
                  <strong>Status:</strong>
                  {service.status}
                </StatusInfo>

                <ButtonGroup>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/message/${service.ticketID}`;
                    }}
                  >
                     Chat <FaRegComment/>
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/paynow/${service.ticketID}`;
                    }}
                  >
                    Pay Now
                  </ActionButton>
                </ButtonGroup>
              </ServiceDetails>
            </RegisteredServiceItem>
          ))
        ) : (
          <Empty 
            Title={'No services to show here'} 
            desc={'Login or Signup to add your services'} 
            btnText={'Explore services'} 
            imgPath={'./assets/emptyServices.svg'} 
            btnlink={'/exservices?type=individual'} 
          />
        )}
      </SectionWrapper>
    </ServicesContainer>
  );
};

export default Services;
