const { PassThrough } = require('stream');

const { userRepository } = require('../repositories');

module.exports = {
  read(id = null) {
    if (id) return userRepository.findByPk(id).then((user) => [user]);

    return userRepository.findAll();
  },

  getUsersStream() {
    const users = new PassThrough();
    userRepository.declareCursorTable().then(async () => {
      let res;
      do {
        res = await userRepository.fetchDataByCursor(1000);
        users.write(JSON.stringify(res));
      } while (res.length);
      users.end();
      await userRepository.commitTransaction();
    });

    return users;
  },

  readAllByChunk() {
    const stream = new PassThrough();
    const findRecursive = (offset = 0) => {
      return userRepository.findPagination(offset).then(({ rows }) => {
        if (!rows.length) {
          return stream.end();
        }

        stream.write(JSON.stringify(rows));
        return findRecursive((offset += 1000));
      });
    };
    findAllRecursive(0);

    return stream;
  },
};
