const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    }
    else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password, role } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      user.username = username;
      user.email = email;
      user.password = password;
      user.role = role;
      const updatedUser = await user.save();
      res.json(updatedUser);
    }
    else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser
};
