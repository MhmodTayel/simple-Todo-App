const Todo = require("../models/todo");
const User = require("../models/user");

const create = (todo) => Todo.create(todo);

const find = (query, req) => {
  const queires = req.query;
  const limit = queires.limit ? queires.limit : 10;
  const skip = queires.skip ? queires.skip : 0;
  const id = req.user["_id"].toString();

  if (isAdmin(id)) {
    return Todo.find({})
      .limit(+limit)
      .skip(+skip)
      .populate("user");
  }

  return Todo.find({ user: id })
    .limit(+limit)
    .skip(+skip)
    .populate("user");
};

const deleteDoc = (id) => {
  return Todo.deleteOne({ id });
};
const update = (id, body) => Todo.updateOne({ id }, body);

const findByUser = (userId) => Todo.find({ user: userId }).populate("user");

async function isAdmin(_id) {
  const user = await User.findOne({ _id });
  if (user.admin) {
    return true;
  }
  return false;
}

module.exports = { create, find, deleteDoc, update, findByUser };
