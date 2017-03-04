/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-26T22:08:02+07:00
 */

const type = require('../../const/redux-actions');
let menuCategoryActions = {
  setShowMenuCategory: (data) => {
    return {
      type: type.showMenuCategory,
      data: data
    }
  }
};

export default menuCategoryActions;
