const express = require("express");
const router = express.Router();
const authorizeUserMW = require("../middlewares/userMW ");
const {
  create,
  find,
  deleteDoc,
  update,
  login,
} = require("../controllers/user");

router.get("/", async (req, res) => {
  find(req)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/", async (req, res, next) => {
  const user = req.body;
  create(user)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/login", async (req, res, next) => {
  // req.user => username, password
  const { username, password } = req.body;
  const token = await login({ username, password });
  res.json(token);
});

router.post("/admin", async (req, res, next) => {
  // req.user => username, password
  const { username, password } = req.body;
  const token = await login({ username, password });
  res.json(token);
});

router.delete("/:id", authorizeUserMW, async (req, res, next) => {
  const id = req.params.id;
  deleteDoc(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.patch("/:id", authorizeUserMW, async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  update(id, body)
    .then((doc) =>
      res.json({ message: "user was edited successfully", user: body })
    )
    .catch((e) => next(e));
});

module.exports = router;
