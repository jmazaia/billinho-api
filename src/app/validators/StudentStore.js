import * as Yup from 'yup';
import { errorResponse } from '../helpers/index';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      birthdate: Yup.string(),
      payment_method: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    errorResponse(req, res, err);
  }
};
