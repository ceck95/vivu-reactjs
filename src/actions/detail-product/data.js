/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T13:01:37+07:00
 */

const type = require('../../const/redux-actions');

let detailProductActions = {
  setDataProductDetail: (data) => {
    return {
      type: type.setDataProductDetail,
      data: data
    }
  }
};

export default detailProductActions;
