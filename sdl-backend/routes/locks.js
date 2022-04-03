const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    locks: {
      id: "1",
      name: "home",
    },
  });
});

module.exports = router;
