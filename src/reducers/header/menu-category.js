/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T10:32:34+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (menuCategory = {
  showMenu: null,
  headerTopHide: null
}, action) => {
  switch (action.type) {
    case type.showMenuCategory:
      {
        return action.data;
      }
    default:
      return menuCategory;
  }
};
