/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T21:25:32+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-07T18:16:05+07:00
 */

const type = require('../../const/redux-actions');
import { helpers } from 'react-base';

module.exports = (loadProduct = {
    loadOfRouter: null,
    loadFilterProduct: null
  } , action) => {
  switch (action.type) {
    case type.statusLoadProduct: {
      return action.data;
    }
    case type.setLoadFilterProduct: {
      return helpers.Data.assign(loadProduct, {
        loadFilterProduct: action.status
      });
    }
    default:
      return loadProduct;
  }
};
