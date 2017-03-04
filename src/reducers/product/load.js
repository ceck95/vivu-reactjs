/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T21:25:32+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:05:41+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (loadProduct = {
  loadOfRouter: null
}, action) => {
  switch (action.type) {
    case type.statusLoadProduct:
      {
        return action.data;
      }
    default:
      return loadProduct;
  }
};
