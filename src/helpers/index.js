/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-24T13:43:36+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-27T14:05:27+07:00
 */



const config = require('../config/index');
const BPromise = require('bluebird');

class ReactHelper {

  get basicToken() {
    return `Basic ${config.api.clientId}`;
  }

  requestBasic(init) {
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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      if (init.body) {
        options.body = JSON.stringify(init.body);
      }

      return fetch(`${baseURL}${init.uri}`, options).then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data.errors) {
          return reject(data);
        }
        return resolve(data);
      }).catch(function(ex) {
        return reject(ex);
      });
    });
  }

  request(init) {
    return new BPromise((resolve, reject) => {
      let baseURL = init.baseURL || config.baseURL;
      let options = {
        method: init.method,
        headers: {
          'authorization': `Bearer ${init.headers.accessToken}`
        }
      }
      if (init.body) {
        options.body = JSON.stringify(init.body);
      }
      return fetch(`${baseURL}${init.uri}`, options).then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data.errors) {
          return reject(data);
        }
        return resolve(data);
      }).catch(function(ex) {
        return reject(ex);
      });
    });
  }

}

module.exports = new ReactHelper();
