const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET = "dev-key" } = process.env;
const User = require("../models/user");
const { messageError } = require("../messageError/messageError");
const NotFoundError = require("../messageError/NotFoundError");
const BadRequestError = require("../messageError/BadRequestError");
const ConflictError = require("../messageError/ConflictError");
const UnauthorizedError = require("../messageError/UnauthorizedError");

const getInfoUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    next(err);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id).orFail(
      new NotFoundError("Пользователь не найден")
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getInfoId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new NotFoundError("Пользователь не найден")
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    const newData = user.toObject();
    delete newData.password;
    res.send(newData);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError("Такой email уже есть в базе данных"));
      return;
    }
    if (err.name === "ValidationError") {
      next(new BadRequestError("Не удалось создать пользователя"));
      return;
    }
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("переданы некорректные данные"));
      return;
    }
    next(err);
  }
};
const editUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("переданы некорректные данные"));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Неверный email или password");
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      throw new UnauthorizedError("Неверный password или email");
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      // "JWT_SECRET",
      NODE_ENV === "production" ? JWT_SECRET : "dev-key",
      {
        expiresIn: "7d",
      }
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getInfoUsers,
  getUserId,
  getInfoId,
  addUser,
  updateAvatar,
  editUser,
  login,
};
