import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from "react-icons/md";
import { fetchData } from '../../../services/apiServices';
// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90vw;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4527a0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;

const AddButton = styled.button`
  margin-top: 5px;
  background-color: #0288d1;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0277bd;
  }
`;

const AddServiceModal = ({ showModal, closeModal, isEditing, handleSaveService }) => {
  const [newServiceName, setNewServiceName] = useState('');
  const [constitutionType, setConstitutionType] = useState('');
  // const [serviceStatus, setServiceStatus] = useState('');
  const [description, setDescription] = useState('');
  const [heading, setHeading] = useState('');
  const [benefits, setBenefits] = useState('');
  const [professionalFees, setProfessionalFees] = useState('');
  const [serviceStatus, setServiceStatus] = useState('');
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [variants, setVariants] = useState([{ variant_name: '', professional_fees: '', steps: [], is_periodical: false, frequency: [] }]);

  // State to store service groups
  const [serviceGroups, setServiceGroups] = useState([]);
  const [selectedServiceGroup, setSelectedServiceGroup] = useState('');

  // Fetch service groups from backend
  const fetchServiceGroups = async () => {
    try {
      const response = await fetchData('/servicegroup'); // Adjust the API endpoint
      setServiceGroups(response.serviceGroups); // Assuming API response contains an array of serviceGroups
    } catch (error) {
      console.error('Error fetching service groups:', error);
    }
  };

  useEffect(() => {
    fetchServiceGroups(); // Fetch service groups when the modal loads
  }, []);
// meri
 // Dynamic Fields for FAQ, Variants, Frequency, and Steps

 // Handle adding multiple FAQs
 const handleAddFAQ = () => {
   setFaqs([...faqs, { question: '', answer: '' }]);
 };

 // Handle adding multiple Variants
 const handleAddVariant = () => {
   setVariants([...variants, { variant_name: '', professional_fees: '', steps: [], is_periodical: false, frequency: [] }]);
 };

 // Handle adding multiple Steps and Frequency within Variants
 const handleAddStep = (variantIndex) => {
   const updatedVariants = [...variants];
   updatedVariants[variantIndex].steps.push({
     step_order: updatedVariants[variantIndex].steps.length + 1,
     step_heading: '',
     description: '',
     information_needed: '',
     file_needed: '',
     person_responsible: ''
   });
   setVariants(updatedVariants);
 };

 const handleAddFrequency = (variantIndex) => {
   const updatedVariants = [...variants];
   updatedVariants[variantIndex].frequency.push({
     type: '',
     service_ref_start_date: '',
     compliance_start_date: '',
     compliance_days: ''
   });
   setVariants(updatedVariants);
 };


 const handleChangeFAQ = (index, field, value) => {
   const updatedFaqs = [...faqs];
   updatedFaqs[index][field] = value;
   setFaqs(updatedFaqs);
 };

 const handleChangeVariant = (index, field, value) => {
   const updatedVariants = [...variants];
   updatedVariants[index][field] = value;
   setVariants(updatedVariants);
 };

 const handleChangeStep = (variantIndex, stepIndex, field, value) => {
   const updatedVariants = [...variants];
   updatedVariants[variantIndex].steps[stepIndex][field] = value;
   setVariants(updatedVariants);
 };

 const handleChangeFrequency = (variantIndex, freqIndex, field, value) => {
   const updatedVariants = [...variants];
   updatedVariants[variantIndex].frequency[freqIndex][field] = value;
   setVariants(updatedVariants);
 };

 // Save Function
 const handleSave = () => {
   const serviceData = {
    category_id: selectedServiceGroup, 
     name: newServiceName,
     constitutionType,
     heading,
     description,
     benefits,
     professionalFees,
     serviceStatus,
     faqs,
     variants,
     
   };
   handleSaveService(serviceData); 
   closeModal(); 
 };
//  


  // Handle saving service


  if (!showModal) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}><MdClose/></CloseButton>
        <ModalTitle>{isEditing ? 'Edit Service' : 'Add Service'}</ModalTitle>
  {/* Service Group Select */}
  <select
          value={selectedServiceGroup}
          onChange={(e) => setSelectedServiceGroup(e.target.value)}
        >
          <option value="">Select Service Group</option>
          {serviceGroups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
        <ModalInput
          type="text"
          placeholder="Service Name"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
        />
 <select
          value={constitutionType}
          onChange={(e) => setConstitutionType(e.target.value)}
        >
          <option value="">constitution Type</option>
         
            <option  value="Individual">
              Individual
            </option>
            <option  value="PartnerShip">
              PartnerShip
            </option>
            <option  value="Company">
              Company
            </option>
         
        </select>
        <ModalInput
          type="text"
          placeholder="Service Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        <ModalTextarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <ModalTextarea
          placeholder="Benefits"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
        />

       {/* FAQ Section */}
       <h4>FAQs</h4>
        {faqs.map((faq, index) => (
          <div key={index}>
            <ModalInput
              type="text"
              placeholder="FAQ Question"
              value={faq.question}
              onChange={(e) => handleChangeFAQ(index, 'question', e.target.value)}
            />
            <ModalTextarea
              placeholder="FAQ Answer"
              value={faq.answer}
              onChange={(e) => handleChangeFAQ(index, 'answer', e.target.value)}
            />
          </div>
        ))}
        <AddButton onClick={handleAddFAQ}>Add FAQ</AddButton>
<br />
        <select
          value={serviceStatus}
          onChange={(e) => setServiceStatus(e.target.value)}
        >
          <option value="">Service Status</option>
         
            <option  value="Created">
              Created
            </option>
            <option  value="Processing">
              Processing
            </option>
            <option  value="Completed">
              Completed
            </option>
         
        </select>
        {/* Variant Section */}
        <h4>Variants</h4>
        {variants.map((variant, index) => (
          <div key={index}>
            <ModalInput
              type="text"
              placeholder="Variant Name"
              value={variant.variant_name}
              onChange={(e) => handleChangeVariant(index, 'variant_name', e.target.value)}
            />
            <ModalInput
              type="number"
              placeholder="Professional Fees"
              value={variant.professional_fees}
              onChange={(e) => handleChangeVariant(index, 'professional_fees', e.target.value)}
            />

            {/* Step Section for each variant */}
            <h5>Steps for {variant.variant_name}</h5>
            {variant.steps.map((step, stepIndex) => (
              <div key={stepIndex}>
               
                
                <ModalInput
                  type="text"
                  placeholder="Step Heading"
                  value={step.step_heading}
                  onChange={(e) => handleChangeStep(index, stepIndex, 'step_heading', e.target.value)}
                />
                <ModalTextarea
                  placeholder="Step Description"
                  value={step.description}
                  onChange={(e) => handleChangeStep(index, stepIndex, 'description', e.target.value)}
                />
                 <ModalInput
                  type="text"
                  placeholder="Information needed"
                  value={step.information_needed}
                  onChange={(e) => handleChangeStep(index, stepIndex, 'information_needed', e.target.value)}
                />
                 
       <ModalInput
                  type="text"
                  placeholder="File Needed"
                  value={step.file_needed}
                  onChange={(e) => handleChangeStep(index, stepIndex, 'file_needed', e.target.value)}
                />
                 <ModalInput
                  type="text"
                  placeholder="Person Responsible"
                  value={step.person_responsible}
                  onChange={(e) => handleChangeStep(index, stepIndex, 'person_responsible', e.target.value)}
                />
              </div>
            ))}
            <AddButton onClick={() => handleAddStep(index)}>Add Step</AddButton>

            {/* Frequency Section for each variant */}
            <h5>Frequency for {variant.variant_name}</h5>
            {variant.frequency.map((freq, freqIndex) => (
              <div key={freqIndex}>
                <ModalInput
                  type="text"
                  placeholder="Frequency Type (Monthly/Yearly)"
                  value={freq.type}
                  onChange={(e) => handleChangeFrequency(index, freqIndex, 'type', e.target.value)}
                />
                 {/* service_ref_start_date: '',
     compliance_start_date: '',
     compliance_days: '' */}
     <label>service start date</label>
      <ModalInput
                  type="date"
                  // placeholder="Frequency Type (Monthly/Yearly)"
                  value={freq.service_ref_start_date}
                  onChange={(e) => handleChangeFrequency(index, freqIndex, 'service_ref_start_date', e.target.value)}
                />
                <label>compliance start date</label>
               <ModalInput
                  type="date"
                  // placeholder="Frequency Type (Monthly/Yearly)"
                  value={freq.compliance_start_date}
                  onChange={(e) => handleChangeFrequency(index, freqIndex, 'compliance_start_date', e.target.value)}
                />  
                <label>compliance days</label>
      <ModalInput
                  type="number"
                  // placeholder="Frequency Type (Monthly/Yearly)"
                  value={freq.compliance_days}
                  onChange={(e) => handleChangeFrequency(index, freqIndex, 'compliance_days', e.target.value)}
                />
              </div>
            ))}
            <AddButton onClick={() => handleAddFrequency(index)}>Add Frequency</AddButton>
          </div>
        ))}
        <AddButton onClick={handleAddVariant}>Add Variant</AddButton>
<br />
       
        <ModalButton onClick={handleSave}>Save Service</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddServiceModal;
