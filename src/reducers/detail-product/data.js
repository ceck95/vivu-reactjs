/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T14:33:56+07:00
 */

const type = require('../../const/redux-actions');

module.exports = (dataProductDetail = {
  resp: {},
  loadStatus: null,
  imageZoom: {}
}, action) => {
  switch (action.type) {
    case type.setDataProductDetail:
      {
        return action.data;
      }
    default:
      return dataProductDetail;
  }
};
