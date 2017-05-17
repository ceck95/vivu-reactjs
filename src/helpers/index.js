/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-24T13:43:36+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T13:42:20+07:00
 */



const config = require('../config/index');
const BPromise = require('bluebird');
import notifyActions from '../actions/header/notify';
import loginActions from '../actions/login/index';

class ReactHelper {

  static get basicToken() {
    return `Basic ${config.api.clientId}`;
  }

  static responseFunc(options, reject, resolve, baseURL, init, dispatch) {
    let code = null;
    return fetch(`${baseURL}${init.uri}`, options).then((response) => {
      code = response.status;
      return response.json();
    }).then((data) => {

      let responseError = (dispatch, error) => {
          error.types = 'errors';
          error.show = true;
          let errorResp = new Error(error);

          dispatch(notifyActions.setDataNotify(error))
          return reject(errorResp);
        },
        respError = null,
        error = {};

      switch (code) {
        case 401:
          dispatch(loginActions.logout());
          respError = true;
          error = data;
          break;
        default:
          if (data.errors) {
            respError = true;
            error = data.errors[0];
          }
          break;
      }

      if (respError) {
        return responseError(dispatch, error);
      }

      if (data.meta.pageNumber) {
        return resolve(data);
      }
      return resolve(data.data);
    }).catch((ex) => {
      return reject(ex);
    });
  }

  static requestMerge(init, dispatch) {
    return new BPromise((resolve, reject) => {

      if (localStorage.getItem(config.login.keyAccessToken)) {
        init.token = `Bearer ${localStorage.getItem(config.login.keyAccessToken)}`;
      }

      let baseURL = init.baseURL || config.api.baseURL,
        options = {
          method: init.method,
          headers: {
            'Authorization': init.token || ReactHelper.basicToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return ReactHelper.responseFunc(options, reject, resolve, baseURL, init, dispatch);
    });
  }

  static requestBasic(init, dispatch) {
    return new BPromise((resolve, reject) => {
      let baseURL = null;
      if (init.baseURL) {
        baseURL = init.baseURL;
      } else {
        baseURL = config.api.baseURL;
      }
      let options = {
        method: init.method,
        headers: {
          'Authorization': init.token || ReactHelper.basicToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return ReactHelper.responseFunc(options, reject, resolve, baseURL, init, dispatch);
    });
  }

  static request(init, dispatch) {
    return new BPromise((resolve, reject) => {
      let baseURL = init.baseURL || config.api.baseURL;

      if (localStorage.getItem(config.login.keyAccessToken)) {
        init.token = `Bearer ${localStorage.getItem(config.login.keyAccessToken)}`;
      }
      let options = {
        method: init.method,
        headers: {
          'Authorization': init.token || null,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return ReactHelper.responseFunc(options, reject, resolve, baseURL, init, dispatch);
    });
  }

}

module.exports = ReactHelper;