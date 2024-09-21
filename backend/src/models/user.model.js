const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'],   },
  dob: { type: Date,   },
  address1: { type: String,   },
  address2: { type: String },
  pincode: { type: String,   },
  district: { type: String,   },
  city: { type: String,   },
  state: { type: String,   },
  adharnumber: { type: String,   },
  pannumber: { type: String,   },
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }] 
});  

const User = mongoose.model('User', userSchema);

module.exports = User;
