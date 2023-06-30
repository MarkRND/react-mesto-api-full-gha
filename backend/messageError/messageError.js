/* eslint-disable no-constant-condition */
const messageError = (err, req, res) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(400).send({
      message: "переданы некорректные данные",
    });
    return;
  }
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: err.message });
    return;
  }
  if (err.name === "NotFoundError") {
    res.status(404).send({ message: err.message });
    return;
  }
  if (err.name === "ForbiddenError") {
    res.status(403).send({ message: err.message });
    return;
  }
  if (err.code === 11000) {
    res.status(409).send({ message: "Такой email уже есть в базе данных" });
    return;
  }
  res.status(500).send({
    message: "Что-то пошло не так",
  });
};

module.exports = { messageError };
