const { Transform, Parser } = require('json2csv');

class ParserCSVService {
  static getTransformParser(
    { fields = [], highWaterMark = 8192 } = { fields: [], highWaterMark: 8192 },
  ) {
    return new Transform({ fields }, { highWaterMark });
  }

  static getParseSync(options = {}) {
    return new Parser(options);
  }
}

module.exports = ParserCSVService;
