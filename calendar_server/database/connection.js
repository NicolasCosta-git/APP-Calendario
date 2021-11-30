// conexão com o banco de dados
require("dotenv").config()

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: ' ',
    user:' ', //coloque seu usuário aqui, caso não esteja usando root
    password: ' ', // coloque sua senha aqui
    database: ' ',
  },
});

module.exports = knex;
