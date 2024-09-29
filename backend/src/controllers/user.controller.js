const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
 const authenticateUser =require('../middlewares/auth.middleware')
const generateOtp = () => {
  return '1234'; // For demo purposes, always return 1234. This should be dynamic in a real-world scenario.
};

// Create or login user (with OTP generation)
exports.registerOrLogin = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    if (!phonenumber) {
      return res.status(400).json({ message: 'Phone number is required',success:false });
    }

    // Check if user exists
    let user = await User.findOne({ phonenumber });

    if (!user) {
      // Create new user with just the phone number
      user = new User({
        fullname: phonenumber,
        email: `${phonenumber}@kgc.com`,
        phonenumber,
      });
    }

    // Generate and store temporary OTP
    const otp = generateOtp();
    user.temporaryOtp = otp;
    await user.save();

    return res.status(200).json({
      message: 'OTP has been sent to your phone',
      otp: otp ,
      success:true
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify OTP and log in or register user
exports.verifyOtp = async (req, res) => {
  try {
    const { phonenumber, otp } = req.body;

    if (!phonenumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required',success:false });
    }

    // Find user by phone number
    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found',success:false });
    }

    // Check OTP
    if (user.temporaryOtp === otp) {
      // OTP is correct, empty the temporary OTP
      user.temporaryOtp = '';
      await user.save();

      // Create JWT token
      const token = jwt.sign(
        { id: user._id, phonenumber: user.phonenumber }, 
        JWT_SECRET
       
      );

      return res.status(200).json({
        message: 'Logged in successfully',
        token,
        user,
        success:true
      });
    } else {
      return res.status(400).json({ message: 'Invalid OTP',success:false });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    // const user =[]
    // if(req.params.id){
    //   const user = await User.findById(req.params.id);

    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found',success:false });
    //   }
    // }else{
    const user = await User.find();
    // }
   
    res.status(200).json({user,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new user (admin only - example)
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, phonenumber, gender, dob, address1, address2, pincode, district, city, state, adharnumber, pannumber } = req.body;
console.log(req.body)
    const newUser = new User({
      fullname,
      email,
      phonenumber,
      gender,
      dob,
      address1,
      address2,
      pincode,
      district,
      city,
      state,
      adharnumber,
      pannumber,
    });

    await newUser.save();
    res.status(201).json({newUser,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    // Log the user ID for debugging
    console.log('User ID:', req.user._id);

    // Ensure req.body is not empty
    if (!req.body) {
      return res.status(400).json({ message: 'No data provided', success: false });
    }

    // Update the user
    const user = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }
    

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error('Update User Error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found',success:false });
    }

    res.status(200).json({ message: 'User deleted successfully',success:true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
