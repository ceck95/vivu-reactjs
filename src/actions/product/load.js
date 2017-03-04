/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:03:50+07:00
 */

const type = require('../../const/redux-actions');

let loadProductActions = {
  statusLoadProduct: (data) => {
    return {
      type: type.statusLoadProduct,
      data: data
    }
  }
};

export default loadProductActions;
