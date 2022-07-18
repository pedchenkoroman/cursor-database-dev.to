const db = require('../models');
const { User, sequelize } = db;

module.exports = {
  transaction: null,
  findAll() {
    return User.findAll();
  },

  findByPk(id) {
    return User.findByPk(id);
  },

  findPagination(offset, limit = 1000) {
    return User.findAndCountAll({
      offset,
      limit,
    });
  },

  async openTransaction() {
    if (this.transaction) return;
    this.transaction = await sequelize.transaction();
  },

  async commitTransaction() {
    if (!this.transaction) return;
    await this.transaction.commit();
    this.transaction = null;
  },

  async declareCursorTable() {
    if (!this.transaction) await this.openTransaction();
    return sequelize.query(
      'DECLARE users_csv NO SCROLL CURSOR WITHOUT HOLD FOR SELECT * FROM "Users" FOR UPDATE',
      { transaction: this.transaction },
    );
  },

  fetchDataByCursor(countRecords) {
    return sequelize.query(`FETCH ${countRecords} FROM users_csv`, {
      transaction: this.transaction,
      type: sequelize.QueryTypes.SELECT,
    });
  },
};

// SELECT * FROM USERS where name like 'John' limit 1000 offset 0;
// SELECT * FROM USERS where name like 'John' limit 1000 offset 1000;
// SELECT * FROM USERS where name like 'John' limit 1000 offset 2000;
