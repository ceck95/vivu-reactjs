/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T21:25:32+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T15:28:09+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('react-base').helpers;

module.exports = (paginateData = {
  loadingProduct: null
}, action) => {
  switch (action.type) {
    case type.setPaginateData:
      {
        return action.data;
      }
    case type.statusLoadProductByPagination:
      {
        return action.data;
      }
    default:
      return paginateData;
  }
};
