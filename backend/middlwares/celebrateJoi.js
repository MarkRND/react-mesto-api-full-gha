const { celebrate, Joi } = require("celebrate");

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i
    ),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationGetUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

const validationEditUser = celebrate({
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object()
    .required()
    .keys({
      avatar: Joi.string()
        .regex(/^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i)
        .required(),
    }),
});

const validationAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .regex(/^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i)
      .required(),
  }),
});

const validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const validationAddLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const validationDeleteLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationSignin,
  validationSignup,
  validationGetUserId,
  validationEditUser,
  validationUpdateAvatar,
  validationAddCard,
  validationDeleteCard,
  validationAddLikeCard,
  validationDeleteLikeCard,
};
