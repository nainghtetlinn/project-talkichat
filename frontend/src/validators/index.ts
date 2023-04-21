import Joi from "joi";

export const validateLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be valid email",
        "string.empty": "Email require",
      }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must have at least 6 characters",
      "string.empty": "Password require",
    }),
  }).validate({ email, password });
};

export const validateSignup = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return Joi.object({
    username: Joi.string().min(5).required().messages({
      "string.empty": "Username require",
      "string.min": "Username must have at least 5 characters",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be valid email",
        "string.empty": "Email require",
      }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password require",
      "string.min": "Password must have at least 6 characters",
    }),
  }).validate({ username, email, password });
};
