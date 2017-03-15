/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-24T13:43:36+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T12:22:03+07:00
 */



const config = require('../config/index');
const BPromise = require('bluebird');
import notifyActions from '../actions/header/notify';

class ReactHelper {

  static get basicToken() {
    return `Basic ${config.api.clientId}`;
  }

  static reponseFunc(options, reject, resolve, baseURL, init, dispatch) {
    let code = null;
    return fetch(`${baseURL}${init.uri}`, options).then((response) => {
      code = response.status;
      return response.json();
    }).then((data) => {

      let responseError = (dispatch, error) => {
        error.types = 'errors';
        error.show = true;
        dispatch(notifyActions.setDataNotify(error));
      };

      switch (code) {
        case 401:
          responseError(dispatch, data);
          return reject(data);
          break;
      }

      if (data.errors) {
        responseError(dispatch, data.errors[0]);
        return reject(data.errors);
      }

      if (data.meta.pageNumber) {
        return resolve(data);
      }
      return resolve(data.data);
    }).catch((ex) => {
      return reject(ex);
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

      return ReactHelper.reponseFunc(options, reject, resolve, baseURL, init, dispatch);
    });
  }

  static requestMerge(init) {
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
          'Authorization': this.basicToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      console.log(options);
      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return fetch(`${baseURL}${init.uri}`, options).then(function(response) {
        return response.json();
      }).then(function(resp) {
        if (resp.errors) {
          return reject(resp);
        }
        return resolve(resp.data);
      }).catch(function(ex) {
        return reject(ex);
      });
    });
  }

  static request(init, dispatch) {
    return new BPromise((resolve, reject) => {
      let baseURL = init.baseURL || config.api.baseURL;
      let options = {
        method: init.method,
        headers: {
          'Authorization': `Bearer ${init.headers.accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      console.log(options);
      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return ReactHelper.reponseFunc(options, reject, resolve, baseURL, init, dispatch);
    });
  }

}

module.exports = ReactHelper;
