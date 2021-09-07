import Sequelize, { Model } from 'sequelize';
import moment from 'moment';

export default class Bill extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          get() {
            return this.getDataValue('id');
          },
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo amount não pode ser vazio',
            },
            min: {
              min: 1,
              msg: 'O campo precisa ser maior que 0',
            },
          },
          get() {
            return this.getDataValue('amount');
          },
        },
        due_date: {
          type: Sequelize.DATE,

          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo due_date não pode ser vazio',
            },
            isDate: {
              msg: 'O campo precisa ser uma data válida',
            },
          },
          get() {
            return moment
              .utc(this.getDataValue('due_date'))
              .format('DD/MM/YYYY');
          },
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo status não pode ser vazio',
            },
            isIn: {
              args: [['open', 'pending', 'paid']],
              msg: 'Status inválido',
            },
          },
          get() {
            return this.getDataValue('status');
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Enrollment, { foreignKey: 'enrollment_id' });
  }
}
