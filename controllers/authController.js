const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email: email});

  if (!user) {
    return res.status(401).json({ message: `user not found` });
  }
  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: `Password incorrect` });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: `1h` }
    );
    console.log({token})


    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.validateToken = async(req,res)=>{
  
}
