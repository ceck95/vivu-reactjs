/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-11T00:25:40+07:00
 */

const type = require('../../const/redux-actions');
const config = require('../../config/index');
import { push } from 'react-router-redux';

let loginActions = {
  setDataLoginSuccess: (data) => {
    if (data.token) {
      localStorage.setItem(config.login.keyAccessToken, data.token.accessToken);
    }
    return {
      type: type.setDataLoginSuccess,
      data: data
    }
  },
  logout: () => {
    localStorage.removeItem(config.login.keyAccessToken);
    return {
      type: type.logout
    }
  },
  redirectHome: () => {
    return (dispatch) => {
      return dispatch(push('/'));
    }
  },
  changeStatusDataLogin: (data, status) => {
    return {
      type: type.changeStatusDataLogin,
      data: data,
      status: status
    }
  },
  pushOrderCustomer: () => {
    return (dispatch) => {
      dispatch(loginActions.activeTabOrderPageCustomer(true));
      dispatch(push('/customer'));
    }
  },
  activeTabOrderPageCustomer: (bool) => {
    return {
      type: type.activeTabOrderPageCustomer,
      data: bool
    }
  }
};

export default loginActions;
