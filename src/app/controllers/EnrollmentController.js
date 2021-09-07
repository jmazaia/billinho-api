import Enrollment from '../models/Enrollment';
import Bill from '../models/Bill';
import { successResponse, errorResponse } from '../helpers/index';

class EnrollmentController {
  async store(req, res) {
    const payload = req.body;
    await Enrollment.create(payload)
      .then(async enrollment => {
        await Enrollment.findByPk(enrollment.getDataValue('id'), {
          attributes: ['id', 'amount', 'installments', 'due_day'],
          include: [
            {
              model: Bill,
              as: 'bills',
              attributes: ['id', 'due_date', 'amount', 'status'],
            },
          ],
        }).then(result => {
          return successResponse(req, res, result);
        });
      })
      .catch(error => {
        return errorResponse(req, res, { error });
      });
  }

  async list(req, res) {
    const { count = 1, page = 1 } = req.query;
    await Enrollment.findAll({
      limit: count,
      offset: (page - 1) * count,
      attributes: ['id', 'amount', 'installments', 'due_day'],
      include: [
        {
          model: Bill,
          as: 'bills',
          attributes: ['id', 'due_date', 'amount', 'status'],
        },
      ],
    })
      .then(result => {
        return successResponse(req, res, { page, items: result });
      })
      .catch(error => {
        return errorResponse(req, res, { error });
      });
  }
}

export default new EnrollmentController();
