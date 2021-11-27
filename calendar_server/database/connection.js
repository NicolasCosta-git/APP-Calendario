// conexão com o banco de dados
require("dotenv").config()

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    user: process.env.USER, //coloque seu usuário aqui, caso não esteja usando root
    password: process.env.PASSWORD, // coloque sua senha aqui
    database: process.env.DATABASE,
  },
});

module.exports = knex;
