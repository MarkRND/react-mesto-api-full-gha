require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlwares/logger");
const router = require("./routes");
const GlobalError = require("./middlwares/GlobalError");

const { PORT = 3000, WEB_HOST = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env; // ВЫНЕСТИ
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://markus.nomoreparties.sbs",
      "http://api.markus.nomoreparties.sbs",
      "https://markus.nomoreparties.sbs",
      "https://api.markus.nomoreparties.sbs",
    ],
  })
);
app.use(cors());
const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect(WEB_HOST, {
  useNewUrlParser: true,
});
app.use(appLimiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(GlobalError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT}`);
});
