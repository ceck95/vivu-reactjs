/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-10T16:23:58+07:00
 */

const type = require('../../const/redux-actions');
let notifyActions = {
  setDataNotify: (data) => {
    return {
      type: type.setDataNotify,
      data: data
    }
  }
};

export default notifyActions;
