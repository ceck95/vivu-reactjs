/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-07T14:56:52+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-27T10:41:25+07:00
 */



let nodeEnv = process.env.NODE_ENV,
  config = null;

switch (nodeEnv) {
  case 'development':
    config = require('./development.json');
    break;
  case 'production':
    config = require('./production.json');
    break;
  default:
    config = require('./development.json');
    break;
}

module.exports = config;
