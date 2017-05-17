/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T13:01:37+07:00
 */

const type = require('../../const/redux-actions');

let checkoutActions = {
  setAddressToCheckout: (address,showCheckout,status) => {
    return {
      type: type.setAddressToCheckout,
      address: address,
      showCheckout:showCheckout,
      status:status
    }
  },
  setShowCheckout: (bool,status) => {
    return {
      type: type.setShowCheckout,
      data: bool,
      status:status
    }
  },
  changeStatusCheckout: (status)=>{
    return {
      type:type.changeStatusCheckout,
      status:status
    }
  }
};

export default checkoutActions;
