/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-09T21:37:04+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (menuCategory = {
  showMenu: null,
  headerTopHide: null,
  loadedListProductHome: null
}, action) => {
  switch (action.type) {
    case type.showMenuCategory:
      {
        return action.data;
      }
    case type.setLoadedListProductHome:
      {
        return action.data;
      }
    default:
      return menuCategory;
  }
};
