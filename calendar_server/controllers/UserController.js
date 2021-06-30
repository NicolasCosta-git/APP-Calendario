const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "123127ytasd7asd81y23as8dtga23379qgasd79astd79";

class UserController {
  // cria o usuário
  async create(req, res) {
    let { email, password } = req.body;
    if (
      (email == undefined &&
        !/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(email)) ||
      email.length < 1
    ) {
      res.status(406);
      res.json({ error: "Email inválido" });
      return;
    }
    if (password == undefined || password.length < 5) {
      res.status(406);
      res.json({
        error: "A senha deve conter pelo menos 5 caracteres",
      });
      return;
    }

    if (await User.findEmail(email)) {
      res.status(406);
      res.json({ error: "Este e-mail já está cadastrado" });
      return;
    }

    await User.new(email, password);
    res.json({ success: "user created" });
    return;
  }

  // recuperação de senha. retorna um token
  async recoverPassword(req, res) {
    let { email } = req.body;
    try {
      var result = await PasswordToken.create(email);
    } catch (err) {
      console.log(err);
      res.status(406);
      res.json(err);
      return;
    }

    if (!result.status) {
      res.status(406);
      res.json(result.err);
      return;
    }
    res.status(200);
    res.json(result.token);
    return;
  }

  // recupera a senha, precisa de um token válido
  async changePassword(req, res) {
    let { token, password } = req.body;
    let isTokenValid = await PasswordToken.validate(token);
    if (!isTokenValid.status) {
      res.status(406);
      res.json({ error: "invalid token" });
      return;
    }
    await User.changePassword(
      password,
      isTokenValid.token.user_id,
      isTokenValid.token.token
    );
    res.status(200);
    res.send("password updated");
  }

  // login
  async login(req, res) {
    let { email, password } = req.body;
    let user = await User.findByEmail(email);

    if (user !== undefined && (await bcrypt.compare(password, user.password))) {
      let token = jwt.sign({ emai: user.emai, id: user.id }, secret);
      res.status(200);
      res.json(token);
      return;
    }
    res.status(406);
    res.json({ status: "Credenciais inválidas" });
  }

  // valida o usuário e retorna seu id
  async validateToken(req, res) {
    res.status(200);
    res.json({ valid: true, status: "success", data: req.body.data });
    return;
  }
}

module.exports = new UserController();
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
