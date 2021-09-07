import moment from 'moment';
import Student from '../models/Student';
import { successResponse, errorResponse, isValidCPF } from '../helpers/index';

class StudentController {
  async store(req, res) {
    const { name, cpf, payment_method } = req.body;
    let { birthdate } = req.body;

    if (!isValidCPF(cpf)) {
      throw new Error('CPF inválido');
    }
    const student = await Student.findOne({
      where: { cpf },
    });

    if (student) {
      throw new Error('Aluno já cadastrado');
    }
    /*
    Convert birthdate to ISO Format
    */
    if (birthdate != null) {
      birthdate = moment(birthdate, 'DD-MM-YYYY');

      if (!birthdate.isValid()) {
        throw new Error('Data de nascimento inválida');
      }
    }
    await Student.create({ name, cpf, birthdate, payment_method })
      .then(result => {
        return successResponse(req, res, { id: result.id });
      })
      /*
      Detailed errors
       */
      .catch(error => {
        errorResponse(req, res, error);
      });
  }

  async list(req, res) {
    const { count = 1, page = 1 } = req.query;
    await Student.findAll({
      limit: count,
      offset: (page - 1) * count,
      attributes: ['id', 'name', 'cpf', 'birthdate', 'payment_method'],
    })
      .then(result => {
        return successResponse(req, res, { page, items: result });
      })
      .catch(error => {
        return errorResponse(req, res, { error });
      });
  }
}

export default new StudentController();
