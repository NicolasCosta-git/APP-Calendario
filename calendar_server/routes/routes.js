const express = require("express");
const app = express();
const router = express.Router();
const UserAuth = require("../middleware/UserAuth");

const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");

//user routes
router.post("/register", UserController.create);
router.post("/recoverpassword", UserController.recoverPassword);
router.put("/changepassword", UserController.changePassword);
router.post("/login", UserController.login);

//event routes
router.post("/newevent", EventController.create);
router.post("/updateevent", EventController.update);
router.delete("/deleteevent/:user_id/:id", EventController.delete);
router.get("/getall/:user_id", EventController.getAll);
router.get("/getbyid/:user_id/:id", EventController.getById);

module.exports = router;
