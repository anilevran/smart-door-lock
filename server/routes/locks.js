const router = require("express").Router();
const Lock = require("../models/Lock.js");
const User = require("../models/User.js");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

router.post("/attach", verify, async (req, res) => {
  const token = req.header("auth-token");
  const lock = await Lock.findById(req.body.id);
  const userId = await jwt.decode(token)._id;
  const userFilter = { _id: userId };
  const userUpdate = { $push: { permissions: lock._id } };
  await User.findOneAndUpdate(userFilter, userUpdate);
  await lock.updateOne({ name: "lockname", isAttached: true });

  try {
    res.send("Lock Attached to User Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getLocks", verify, async (req, res) => {
  const token = req.header("auth-token");

  const userId = await jwt.decode(token)._id;
  const user = await User.findById(userId);

  var itemsProcessed = 0;
  const getLocks = async (id) => {
    let lock = await Lock.findById(id);
    let responseObj = {
      id: lock._id,
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
    getLocks(id);
  });
});

router.post("/getLock", verify, async (req, res) => {
  let lock = await Lock.findById(req.body.id);
  let responseObj = {
    id: lock._id,
    name: lock.name,
    isLocked: lock.isLocked,
  };
  res.send(responseObj);
});

router.post("/createLocks", verify, async (req, res) => {
  var inner_count = 0;
  while (inner_count < req.body.count) {
    let lock = new Lock();
    inner_count++;
    try {
      await lock.save();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  res.send("Locks Saved Successfully");
});

router.post("/updateLockStatus", verify, async (req, res) => {
  let lock = await Lock.findById(req.body.id);
  await lock.updateOne({ isLocked: req.body.isLocked });
  res.send("Lock Status Updated");
});

router.get("/findEmptyLock", verify, async (req, res) => {
  let lock = await Lock.findOne({ isAttached: false });
  res.send(lock._id);
});
module.exports = router;
