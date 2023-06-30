const router = require("express").Router();
const {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require("../controllers/cards");
const {
  validationAddCard,
  validationDeleteCard,
  validationAddLikeCard,
  validationDeleteLikeCard,
} = require("../middlwares/celebrateJoi");

router.get("/", getCards);
router.post("/", validationAddCard, addCard);
router.delete("/:cardId", validationDeleteCard, deleteCard);
router.put("/:cardId/likes", validationAddLikeCard, addLikeCard);
router.delete("/:cardId/likes", validationDeleteLikeCard, deleteLikeCard);

module.exports = router;
