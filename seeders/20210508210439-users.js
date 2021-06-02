const https = require('https');

module.exports = {
  up: async (queryInterface) => {
    try {
      const resp = await new Promise((resolve) => {
        return https.get(
          'https://randomuser.me/api/?inc=name,dob&results=5000',
          resolve,
        );
      });
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      const { results } = await new Promise((resolve) =>
        resp.on('end', () => resolve(JSON.parse(data))),
      );

      await queryInterface.bulkInsert(
        'Users',
        results.map((item) => ({
          lastName: item.name.last,
          firstName: item.name.first,
          age: item.dob.age,
        })),
      );
    } catch (e) {
      console.log('e', e);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

(async function () {})();
