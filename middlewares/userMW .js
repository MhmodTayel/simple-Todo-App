const User = require("../models/user");

const authorizeUserMW = async (req, res, next) => {
  const loginId = req.user._id.toString();
  const userId = req.params.id;
  const doc = await User.findOne({ _id: userId });
  const id = doc.toString();
  if (loginId != id) res.json("you don't have the permission");
  next();
};

module.exports = authorizeUserMW;
