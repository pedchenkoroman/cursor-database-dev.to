const { parseAsync, AsyncParser } = require('json2csv');

const { userRepository } = require('../repositories');

module.exports = {
  read(id = null) {
    if (id) return userRepository.findByPk(id);

    return userRepository.findAll();
  },

  async exportToCVSFindAll() {
    const users = await userRepository.findAll();
    return parseAsync(users ?? []);
  },

  async exportToCVSPagination() {
    const users = await this._getUsers();
    return parseAsync(users);
  },

  async exportToCSVCursor(writeStream) {
    await userRepository.declareCursorTable();
    const transformOpts = { highWaterMark: 8192 };
    const asyncParser = new AsyncParser({}, transformOpts);
    asyncParser.processor
      .on('data', (chunk) => writeStream.write(chunk))
      .on('end', () => writeStream.end());

    let res;
    do {
      res = await userRepository.fetchDataByCursor(1000);
      res.forEach((item) => asyncParser.input.push(JSON.stringify(item)));
    } while (res.length);
    asyncParser.input.push(null);
    await userRepository.commitTransaction();
  },

  async _getUsers(offset = 0, data = []) {
    const results = [...data];
    const { rows } = await userRepository.findAllPagination(offset);
    if (!rows.length) {
      return results;
    }

    return this._getUsers((offset += 1000), [...results, ...rows]);
  },
};
