const conf = require('../../../config.json');

export class Config {
  static SECRET_KEY: string = conf.secretKey;
}
