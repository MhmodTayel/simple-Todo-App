"use strict";

var Todo = require("../models/todo");

var create = function create(todo) {
  return Todo.create(todo);
};

var find = function find(query, req) {
  var queires = req.query;
  var limit = queires.limit ? queires.limit : 4;
  var skip = queires.skip ? queires.skip : 0;
  return Todo.find({
    user: user
  }).limit(+limit).skip(+skip).populate("user");
};

var deleteDoc = function deleteDoc(id) {
  return Todo.deleteOne({
    _id: id
  });
};

var update = function update(id, body) {
  return Todo.updateOne({
    _id: id
  }, body);
};

var findByUser = function findByUser(userId) {
  return Todo.find({
    user: userId
  }).populate("user");
};

module.exports = {
  create: create,
  find: find,
  deleteDoc: deleteDoc,
  update: update,
  findByUser: findByUser
};