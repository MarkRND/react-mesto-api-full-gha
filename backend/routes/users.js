const router = require("express").Router();

const {
  getInfoUsers,
  getUserId,
  getInfoId,
  addUser,
  updateAvatar,
  editUser,
} = require("../controllers/users");
const {
  validationGetUserId,
  validationEditUser,
  validationUpdateAvatar,
} = require("../middlwares/celebrateJoi");

router.get("/me", getInfoId);
router.get("/:_id", validationGetUserId, getUserId);
router.get("/", getInfoUsers);
router.post("/", addUser);
router.patch("/me", validationEditUser, editUser);
router.patch("/me/avatar", validationUpdateAvatar, updateAvatar);

module.exports = router;
