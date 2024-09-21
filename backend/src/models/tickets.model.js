const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
 
  issue: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'] },
  createdAt: { type: Date, default: Date.now },

});

const Ticket = mongoose.model('Ticket', ticketSchema);
