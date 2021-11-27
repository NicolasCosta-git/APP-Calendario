const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.use("/", router);

app.listen(3030, () => {
  console.log("Server running on port: http://localhost:3030");
});
