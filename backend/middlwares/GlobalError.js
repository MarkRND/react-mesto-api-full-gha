const GlobalError = (err, req, res, next) => {
  res.status(500).send({ message: "Ошибка сервера" });
  next();
};

module.exports = GlobalError;
