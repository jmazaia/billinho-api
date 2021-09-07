import Sequelize, { Model } from 'sequelize';
import createBills from '../helpers/hooks';

export default class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode estar vazio',
            },
            min: {
              args: 1,
              msg: 'O campo deve ser maior que 0',
            },
          },
        },
        installments: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode ser vazio',
            },
            min: {
              args: 2,
              msg: 'O campo precisa ser maior que 1',
            },
          },
        },
        due_day: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode ser vazio',
            },
            max: {
              args: 31,
              msg: 'A data de vencimento não pode ser menor que 31',
            }, // only allow values <= 23
            min: {
              args: 1,
              msg: 'A data de vencimento não pode ser menor que 1',
            },
          },
        },
      },
      {
        sequelize,
        hooks: {
          afterCreate: instance => {
            createBills(instance);
          },
          afterUpdate: instance => {
            createBills(instance);
          },
        },
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
    this.hasMany(models.Bill, { foreignKey: 'enrollment_id', as: 'bills' });
  }
}
