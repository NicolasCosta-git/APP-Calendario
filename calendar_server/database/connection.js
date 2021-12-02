// conexão com o banco de dados
require("dotenv").config()

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: 'calendar.chsa2no89nfh.us-east-1.rds.amazonaws.com',
    user:'admin', //coloque seu usuário aqui, caso não esteja usando root
    password: '12345678', // coloque sua senha aqui
    database: 'calendar',
  },
});

module.exports = knex;
