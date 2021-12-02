const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(fileupload());
app.use(cors());
app.use(morgan("dev"));

app.use("/", router);

app.listen(3030, () => {
  console.log("Server running on port: http://localhost:3030");
});
