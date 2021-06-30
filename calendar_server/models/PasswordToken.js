const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class PasswordToken {
  // cria um token para a recuperação de senha
  async create(email) {
    let user = await User.findByEmail(email);
    if (user !== undefined) {
      try {
        let token = Math.round(Date.now() * Math.random());
        await knex
          .insert({
            user_id: user.id,
            used: 0,
            token,
          })
          .table("PasswordTokens");
        return { status: true, token };
      } catch (err) {
        console.log(err);
        return { status: false, err };
      }
    } else {
      return { status: false, err: "Este email não está cadastrado" };
    }
  }

  // valida o token
  async validate(token) {
    try {
      let result = await knex.select().where({ token }).table("PasswordTokens");
      if (result.length > 0) {
        let tk = result[0];
        if (tk.used) return { status: false };
        return { status: true, token: tk };
      }
      return { status: false };
    } catch (err) {
      console.log(err);
      return { status: false };
    }
  }

  // define o token como usado
  async setUsed(token) {
    await knex
      .update({ used: 1 })
      .where({ token: token })
      .table("PasswordTokens");
  }
}

module.exports = new PasswordToken();
const User = require("./User");
