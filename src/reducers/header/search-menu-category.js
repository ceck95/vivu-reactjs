/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-26T19:30:26+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (searchMenuCategory = {
  showMenu: false
}, action) => {
  switch (action.type) {
    case type.showSearchMenuCategory:
      {
        return action.data;
      }
    default:
      return searchMenuCategory;
  }
};
