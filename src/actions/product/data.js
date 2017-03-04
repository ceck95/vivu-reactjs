/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T12:21:24+07:00
 */

const type = require('../../const/redux-actions');

let productActions = {
  setDataProductsToList: (data) => {
    return {
      type: type.setDataProductsToList,
      data: data
    }
  }
};

export default productActions;
