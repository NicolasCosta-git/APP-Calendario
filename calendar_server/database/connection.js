// conexão com o banco de dados
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root", //coloque seu usuário aqui, caso não esteja usando root
    password: "SUA SENHA", // coloque sua senha aqui
    database: "calendar",
  },
});

module.exports = knex;
