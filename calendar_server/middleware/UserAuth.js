const jwt = require("jsonwebtoken");
require("dotenv").config()

const secret = "123127ytasd7asd81y23as8dtga23379qgasd79astd79"

// AuthMiddleware, não permite que o usuário entre em rotas protegidas sem estar autenticado
module.exports = function (req, res, next) {
/*   console.log(req.headers) */
  const authToken = req.headers["authorization"];
  if (authToken !== undefined) {
    let bearer = authToken.split(" ");
    let token = bearer[1];
    try {
      let decoded = jwt.verify(token, secret);
      req.body.data = decoded;
      next();
      return;
    } catch (err) {
      res.status(403);
      res.json({ valid: false, error: "invalid user/password combination" });
      return;
    }
  }
  res.status(403);
  res.json({ valid: false, error: "invalid user/password combination" });
  return;
};
