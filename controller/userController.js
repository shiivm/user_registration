const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const UserRole = require("../models/userRoleModel");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || name == "" || name == null)
    return res.status(400).json({ errorMsg: "Name can not be empty!" });

  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || email == "" || email == null) {
    return res.status(400).json({ errorMsg: "Email can not be empty!" });
  } else if (!emailRegexp.test(email)) {
    return res.status(400).json({ errorMsg: "Email is invalid!" });
  }

  if (!password || password == "" || password == null) {
    return res.status(400).json({ errorMsg: "Password can not be empty!" });
  }

  if (password.lenth < 8 || password.lenth > 30) {
    return res
      .status(400)
      .json({ errorMsg: "Password must be between 8 to 30 characters!" });
  }
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ errorMsg: "User already exists!!" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) throw Error("Something went wrong hashing the password");

    const count = await User.countDocuments({});
    let role = count > 0 ? "user" : "admin";

    userRole = await UserRole.findOne({ role: role }, { _id: true });
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: userRole._id,
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong!!");

    res.status(200).json({
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (e) {
    console.error("Method::registerUser. Error: " + e.message);
    res.status(400).json({ errorMsg: "Something went wrong!!" });
  }
};
