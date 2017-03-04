/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-01T12:16:44+07:00
 */

const type = require('../../const/redux-actions');
let categoryGroupActions = {
  setDataCategoryGroup: (data) => {
    return {
      type: type.setDataCategoryGroup,
      data: data
    }
  },
  setDataProductToCategoryGroup: (data, dataCategoryGroup) => {
    return {
      type: type.setDataProductToCategoryGroup,
      data: data,
      dataCategoryGroup: dataCategoryGroup
    }
  }
};

export default categoryGroupActions;
