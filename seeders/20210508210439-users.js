const https = require('https');
const { PassThrough } = require('stream');

const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const Batch = require('stream-json/utils/Batch');
const { pick } = require('stream-json/filters/Pick');
const { streamArray } = require('stream-json/streamers/StreamArray');

module.exports = {
  up: (queryInterface) => {
    return new Promise((resolve) => {
      const stream = new PassThrough();
      https.get('https://randomuser.me/api/?inc=name,dob&results=5000', (res) =>
        res.pipe(stream),
      );

      const pipeline = chain([
        stream,
        parser(),
        pick({ filter: 'results' }),
        streamArray(),
        ({ value }) => ({
          lastName: value.name.last,
          firstName: value.name.first,
          age: value.dob.age,
        }),
        new Batch({ batchSize: 500 }),
      ]);

      pipeline.on('data', async (data) => {
        await queryInterface.bulkInsert('Users', data);
      });
      pipeline.on('end', resolve);
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
