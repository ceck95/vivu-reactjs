/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-10T16:43:07+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (dataNotify = {}, action) => {
  switch (action.type) {
    case type.setDataNotify:
      {
        return action.data;
      }
    default:
      return dataNotify;
  }
};
