/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-28T14:37:21+07:00
 */

const type = require('../../const/redux-actions');
let productActions = {
  setProductCategoryGroup: (data) => {
    return {
      type: type.setProductCategoryGroup,
      data: data
    }
  }
};

export default productActions;
