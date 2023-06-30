const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
const User = require("../models/user");
const { messageError } = require("../messageError/messageError");
const NotFoundError = require("../messageError/NotFoundError");

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
    messageError(err, req, res);
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
    messageError(err, req, res);
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
    messageError(err, req, res);
    next(err);
  }
};

const updateAvatar = async (req, res) => {
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
    messageError(err, req, res);
  }
};
const editUser = async (req, res) => {
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
    messageError(err, req, res);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const err = new Error("Неверный email или password");
      err.name = "UnauthorizedError";
      messageError(err, req, res);
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      const err = new Error("Неверный password или email");
      err.name = "UnauthorizedError";
      messageError(err, req, res);
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      // "JWT_SECRET",
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
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
