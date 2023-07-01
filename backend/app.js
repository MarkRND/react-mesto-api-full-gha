require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlwares/logger");
const router = require("./routes");
const GlobalError = require("./middlwares/GlobalError");
const appLimiter = require("./settings/settingsLimiter");

const { PORT = 3000, WEB_HOST = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;
const app = express();

mongoose.connect(WEB_HOST, {
  useNewUrlParser: true,
});
app.use(cors());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.use(requestLogger);
app.use(appLimiter);
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(GlobalError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT}`);
});
