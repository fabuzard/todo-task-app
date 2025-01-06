const user = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const jwt = require(`jsonwebtoken`)
//Creating /registering user
exports.registerUser = async(req, res) => {
  const { name,username, email, password } = req.body;

  if (!name || !email || !password||!username) {
    return res
      .status(400)
      .json({ message: "All fields (name, email, password,username) are required." });
  }
try {
  const existingUser = await user.findOne({$or: [{email},{password}]});
  if(existingUser){
    return res.status(400).json({message: `The email or username has already been used`})
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt)

  const newUser = new user({
  name,
  email,
  username,
  password:hashedPassword,
  })

  await newUser.save()
  res.status(200).json({message:`The user${name} has been created`})

} catch (error) {
  res.status(500).json({message:`Error registering user:` + error.message})
}

};
// get all users
exports.getUsers = (req, res) => {
  user
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(400).json({ message: e.message });
    });
};
//get a single user
exports.getUser = async (req, res) => {
  const { name } = req.params;

  try {
    const findUser = await user.findOne({ name });
    if (!findUser) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

// delete a single user
exports.deleteUser = async (req, res) => {
  const { name } = req.params;
  try {
    const deleteUser = await user.deleteOne({ name });
    if (deleteUser.deletedCount == 0) {
      return res.status(404).json({ message: `The user '${name}' not found` });
    }
    return res
      .status(200)
      .json({
        message: `The user ${name} has been deleted`,
        result: deleteUser,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//update user
exports.updateUser = async (req, res) => {
  const { name } = req.params;
  const updates = req.body;
  
  try {
    // Attempt to update the user
    const updateUserInfo = await user.findOneAndUpdate(
      { name },                     // Find user by name
      { $set: updates },            // Apply updates
      { new: true, runValidators: true } // Return updated user, validate fields
    );

    // If user not found
    if (!updateUserInfo) {
      return res.status(404).json({
        message: `User with the name "${name}" not found.`,
      });
    }

    // If user found and updated
    return res.status(200).json({
      message: `User "${name}" has been successfully updated.`,
      data: updateUserInfo,
    });
  } catch (error) {
    // Catch and return server error
    return res.status(500).json({
      message: "Server error occurred.",
      error: error.message,
    });
  }
};

//delete all users 
exports.deleteAllUser = async(req,res)=>{
  try {
  const result = await user.deleteMany({});
  return res.status(200).json({
    message:`a total of ${result.deletedCount} users have been deleted`
  })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting users.",
      error:error.message
    })
  }
}
