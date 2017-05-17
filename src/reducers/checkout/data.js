/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T14:33:56+07:00
 */

const type = require('../../const/redux-actions');
import { helpers } from 'react-base';
import loadStatus from '../../const/load-status';

module.exports = (dataCheckout = {
    loadStatus: null,
    address: {},
    showCheckout: false
  } , action) => {
  switch (action.type) {
    case type.setAddressToCheckout: {
      return helpers.Data.assign(dataCheckout, {
        address: action.address,
        showCheckout:action.showCheckout,
        loadStatus:action.status
      });
    }
    case type.setShowCheckout: {
      return helpers.Data.assign(dataCheckout, {
        showCheckout: action.data,
        loadStatus:loadStatus.assignDataLoad
      });
    }
    case type.changeStatusCheckout:{
      return helpers.Data.assign(dataCheckout,{
        loadStatus:action.status
      });
    }
    default:
      return dataCheckout;
  }
};
