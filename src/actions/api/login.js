/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T12:20:27+07:00
 */

const helpers = require('../../helpers/index');
import loginActions from '../login/index';
import popUpActions from '../header/pop-up';
import config from '../../config/index';
import ReactBase from 'react-base';
import buttonStatus from '../../const/button-status';
import notifyActions from '../header/notify';

let apiLoginActions = {

  login: (data, statePopup) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: '/customers/login',
        method: 'POST',
        body: {
          data: {
            login: data.email,
            password: data.password
          }
        }
      }, dispatch).then(data => {
        dispatch(popUpActions.setStatePopupLogin(ReactBase.helpers.Data.assign(statePopup, {
          disableButtonLogin: buttonStatus.clickedSuccess
        })));
        dispatch(loginActions.setDataLoginSuccess(data));
        dispatch(notifyActions.setDataNotify({
          uiMessage: `${data.customer.fullName} login successfully`,
          type: 'success',
          show: true
        }));
      }).catch(err => {
        dispatch(popUpActions.setStatePopupLogin(ReactBase.helpers.Data.assign(statePopup, {
          disableButtonLogin: buttonStatus.clickedError
        })));
      });

    }
  },
  signin: (data, statePopup) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: '/customers/register',
        method: 'POST',
        body: {
          data: {
            email: data.email,
            password: data.password,
            phone: data.phone,
            gender: data.gender,
            fullName: data.fullName,
            dob: data.dob,
            address: {
              street: data.address.street,
              city: data.address.city
            }
          }
        }
      }, dispatch).then(data => {
        dispatch(popUpActions.setStatePopupLogin(ReactBase.helpers.Data.assign(statePopup, {
          disableButtonSignin: buttonStatus.clickedSuccess
        })));
        dispatch(loginActions.setDataLoginSuccess(data));
        dispatch(notifyActions.setDataNotify({
          uiMessage: `${data.customer.fullName} signin successfully`,
          type: 'success',
          show: true
        }));
      }).catch(err => {
        dispatch(popUpActions.setStatePopupLogin(ReactBase.helpers.Data.assign(statePopup, {
          disableButtonSignin: buttonStatus.clickedError
        })));
      });

    }
  },
  profile: (data) => {
    return (dispatch) => {
      helpers.request({
        uri: '/customers',
        method: 'GET',
        headers: {
          accessToken: data[config.login.keyAccessToken]
        }
      }, dispatch).then(data => {
        dispatch(loginActions.setDataLoginSuccess(data));
      });
    }
  }

};

export default apiLoginActions;
