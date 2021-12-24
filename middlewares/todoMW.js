const Todo = require("../models/todo");
const User = require("../models/user");

const authorizeTodoMW = async (req, res, next) => {
  const userId = req.user._id.toString();
  
  async function isAdmin(_id, res, next) {
    const user = await User.findOne({ _id });
    if (user.admin) {
      next();
    } else {
      const todoId = req.params.id; // id => todo => user:124535
      const doc = await Todo.findOne({ _id: todoId }, { user: 1 });
      const todoUserId = doc.user.toString();
      console.log(userId, todoUserId);
      if (userId != todoUserId) res.json("you don't have the permission");
      next();
    }
  }
  isAdmin(userId, res, next);
};

module.exports = authorizeTodoMW;
