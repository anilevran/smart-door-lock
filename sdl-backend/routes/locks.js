const router = require("express").Router();
const Lock = require("../models/Lock.js");
const User = require("../models/User.js");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

// router.get("/", verify, (req, res) => {
//   res.json({
//     locks: {
//       id: "1",
//       name: "home",
//     },
//   });
// });

router.get("/attach", verify, (req, res) => {
  res.json("attach");
});

router.get("/getLocks", verify, async (req, res) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  const userId = await jwt.decode(token)._id;
  const user = await User.findById(userId);

  var itemsProcessed = 0;
  const someFunc = async (id) => {
    let lock = await Lock.findById(id);
    let responseObj = {
      name: lock.name,
      isLocked: lock.isLocked,
    };
    lockArr.push(responseObj);
    itemsProcessed++;
    if (itemsProcessed === user.permissions.length) {
      res.send(lockArr);
    }
  };
  let lockArr = [];
  user.permissions.forEach((id) => {
    someFunc(id);
  });
});

router.get("/setLocks", verify, async (req, res) => {
  var lock = new Lock({
    id: "2",
    name: "lock2",
    isLocked: true,
  });

  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  const userId = await jwt.decode(token)._id;
  const filter = { _id: userId };
  const update = { $push: { permissions: lock._id } };
  await User.findOneAndUpdate(filter, update);

  try {
    await lock.save();
    res.send(lock._id + " Saved Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
