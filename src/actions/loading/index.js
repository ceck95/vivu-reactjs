/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T09:45:24+07:00
 */

const type = require('../../const/redux-actions');

let loadActions = {
  statusLoadingProductByCategory: (data) => {
    return {
      type: type.statusLoadingProductByCategory,
      data: data
    }
  },
  statusLoadingCategoryGroup: () => {
    return {
      type: type.statusLoadingCategoryGroup
    }
  }
};

export default loadActions;
