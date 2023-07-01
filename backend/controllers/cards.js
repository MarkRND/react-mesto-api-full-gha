const Card = require("../models/card");
const { messageError } = require("../messageError/messageError");

const NotFoundError = require("../messageError/NotFoundError");
const ForbiddenError = require("../messageError/ForbiddenError");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    messageError(err, req, res);
  }
};

const addCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const addLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    if (!card) {
      throw new NotFoundError("Карточка не найдена");
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const deleteLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true }
    );
    if (!card) {
      throw new NotFoundError("Карточка не найдена");
    }
    res.send(card);
  } catch (err) {
    messageError(err, req, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError("Карточка не найдена");
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError("У вас нет прав на удаление этой карточки");
    }
    const deletedCard = await Card.findByIdAndRemove(cardId);
    res.send(deletedCard);
  } catch (err) {
    messageError(err, req, res);
  }
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
