const Card = require("../models/card");

const NotFoundError = require("../messageError/NotFoundError");
const ForbiddenError = require("../messageError/ForbiddenError");
const BadRequestError = require("../messageError/BadRequestError");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const addCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Неудалось создать карточку"));
      return;
    }
    next(err);
  }
};

const addLikeCard = async (req, res, next) => {
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
    next(err);
  }
};

const deleteLikeCard = async (req, res, next) => {
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
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
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
    next(err);
  }
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
