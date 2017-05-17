/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T15:01:49+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (dataImageZoomProductDetail = {}, action) => {
  switch (action.type) {
    case type.setDataImageZoomProductDetail:
      {
        return action.data;
      }
    default:
      return dataImageZoomProductDetail;
  }
};
