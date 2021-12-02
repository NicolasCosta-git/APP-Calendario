const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const UserAuth = require("../middleware/UserAuth");
const uploadS3 = require("../helpers/S3/uploadS3");

const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");

//rotas do usuário
router.post("/register", UserController.create);
router.post("/recoverpassword", UserController.recoverPassword);
router.put("/changepassword", UserController.changePassword);
router.post("/login", UserController.login);
router.put("/user/:id", UserAuth, UserController.update);
router.delete("/user/:id", UserAuth, UserController.deleteUser);

//rotas de evento
router.post("/upload", UserAuth, EventController.imageUpload);
router.post("/newevent", UserAuth, EventController.create);
router.post("/updateevent", UserAuth, EventController.update);
router.delete("/deleteevent/:user_id/:id", UserAuth, EventController.delete);
router.get("/getall/:user_id", UserAuth, EventController.getAll);
router.get("/getbyid/:user_id/:id", UserAuth, EventController.getById);
router.post("/validate", UserAuth, UserController.validateToken);

module.exports = router;
