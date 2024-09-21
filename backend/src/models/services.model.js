const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Step schema
const stepSchema = new Schema({
  step_order: { type: Number, required: true },
  step_heading: { type: String, required: true },
  description: { type: String, required: true },
  information_needed: [String],
  file_needed: [String],
  person_responsible: { type: String, required: true }
});

// Define the Frequency schema
const frequencySchema = new Schema({
  type: { type: String, enum: ['Monthly', 'Quarterly'], required: true },
  service_ref_start_date: { type: Date, required: true },
  compliance_start_date: { type: Date, required: true },
  compliance_days: { type: Number, required: true }
});

// Define the Variant schema
const variantSchema = new Schema({
  variant_name: { type: String, required: true },
  professional_fees: { type: Number, required: true },
  steps: [stepSchema],
  is_periodical: { type: Boolean, required: true },
  frequency: [frequencySchema]
});

// Define the FAQ schema
const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Define the Service schema
const serviceSchema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  constitution_types: [{ type: String, enum: ['Individual', 'Partnership', 'Company'], required: true }],
  heading: { type: String, required: true },
  description: { type: String, required: true },
  benefits: { type: String, required: true },
  faq: [faqSchema],
  service_status: [{ type: String, enum: ['Created', 'Processing', 'Completed'], required: true }],
  variants: [variantSchema]
});


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
