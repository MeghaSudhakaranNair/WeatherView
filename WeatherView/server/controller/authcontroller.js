const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Add password comparison logic here (e.g., bcrypt)

    res.send({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).send(error);
  }
};
