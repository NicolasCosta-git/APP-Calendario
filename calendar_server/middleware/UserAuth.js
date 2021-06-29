const jwt = require("jsonwebtoken");

const secret = "123127ytasd7asd81y23as8dtga23379qgasd79astd79";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken !== undefined) {
    let bearer = authToken.split(" ");
    let token = bearer[1];
    try {
      let decoded = jwt.verify(token, secret);
    } catch (err) {
      res.status(403);
      res.json({ error: "invalid password" });
    }
  }
  res.status(403);
  res.json({ error: "invalid password" });
};
