import Sequelize from 'sequelize';
import Student from '../app/models/Student';
import Bill from '../app/models/Bill';
import Enrollment from '../app/models/Enrollment';
import databaseConfig from '../config/database';

const models = [Student, Enrollment, Bill];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
