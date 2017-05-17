/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T13:49:49+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T10:04:47+07:00
 */

const type = require('../../const/redux-actions');
import {push} from 'react-router-redux';

let popUpActions = {
  setStatePopupLogin: (data) => {
    return {
      type: type.setStatePopupLogin,
      data: data
    }
  },
  setStatePopupSignin: (data) => {
    return {
      type: type.setStatePopupSignin,
      data: data
    }
  }
};

export default popUpActions;
