const express = require("express");
const UsersController = require("../controllers/usersController");
const CardController = require("../controllers/CardController");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");
const { openBooster } = require("../controllers/Booster");
const Booster = require("../controllers/Booster");

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.get("/users/:id", UsersController.show); // GET /users/:id
router.post("/users", UsersController.store); // POST /users
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);
router.get("/users/:id/LastBooster", UsersController.show);
router.post("/usersUpdate/:id", UsersController.update);

router.get("/cards", CardController.index); // GET /cards
router.get("/cards/:id", CardController.show); // GET /cards/:id
router.get("/getUserCards", authenticateToken, CardController.getUserCards);


router.post("/cards", CardController.store); // POST /cards

router.post("/openBooster", Booster.openBooster);
router.post("/resetBooster", Booster.resetBooster);

module.exports = router;