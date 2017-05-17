/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T14:59:41+07:00
 */

const type = require('../../const/redux-actions');

let imageZoomProductDetailActions = {
  setDataImageZoomProductDetail: (data) => {
    return {
      type: type.setDataImageZoomProductDetail,
      data: data
    }
  }
};

export default imageZoomProductDetailActions;
