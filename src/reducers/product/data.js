/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T21:25:34+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('react-base').helpers;

module.exports = (dataListProduct = [], action) => {
  switch (action.type) {
    case type.setDataProductsToList:
      {
        return action.data.data.products;
      }
    default:
      return dataListProduct;
  }
};
