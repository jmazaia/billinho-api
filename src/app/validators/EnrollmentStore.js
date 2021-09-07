import * as Yup from 'yup';
import { errorResponse } from '../helpers/index';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      installments: Yup.number().required(),
      due_day: Yup.number().required(),
      student_id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    errorResponse(req, res, err);
  }
};
