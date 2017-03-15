/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-11T00:27:19+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('react-base').helpers;

module.exports = (dataLogin = {}, action) => {
  switch (action.type) {
    case type.setDataLoginSuccess:
      {
        return action.data;
      }
    default:
      return dataLogin;
  }
};
