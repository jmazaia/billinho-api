import Sequelize, { Model } from 'sequelize';
import moment from 'moment';

export default class Student extends Model {
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo nome não pode ser vazio',
            },
            min: {
              args: 2,
              msg: 'Nome inválido',
            },
          },
          get() {
            return this.getDataValue('name');
          },
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: { args: [14, 14], msg: 'Formato de CPF inválido' },
          },
          get() {
            return this.getDataValue('cpf');
          },
        },
        birthdate: {
          type: Sequelize.DATEONLY,
          get() {
            if (this.getDataValue('birthdate') != null) {
              return moment
                .utc(this.getDataValue('birthdate'))
                .format('DD/MM/YYYY');
            }
            return null;
          },
          validate: {
            isDate: {
              msg: 'O campo precisa ser uma data válida',
            },
          },
        },
        payment_method: {
          type: Sequelize.STRING,
          allowNull: false,
          get() {
            if (this.getDataValue('payment_method') === 'credit_card') {
              return 'Cartão de Crédito';
            }
            return 'Boleto';
          },
          validate: {
            isIn: {
              args: [['credit_card', 'boleto']],
              msg: 'Selecione credit_card ou boleto',
            },
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Enrollment, { foreignKey: 'student_id' });
  }
}
