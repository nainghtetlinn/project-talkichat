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
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.email":
              err.message = `${err.path} should be a valid email`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.min":
              err.message = `${err.path} should have at least ${err.local.limit} characters!`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  }).validate({ email, password });
};

export const validateSignup = ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.email":
              err.message = `${err.path} should be a valid email`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.min":
              err.message = `${err.path} should have at least ${err.local.limit} characters!`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    username: Joi.string()
      .min(5)
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.min":
              err.message = `${err.path} should have at least ${err.local.limit} characters!`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  }).validate({ email, password, username });
};
