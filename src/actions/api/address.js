/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:24:11+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('../../helpers/index');
import addressActions from '../address/data';
import config from '../../config/index';
import checkoutActions from '../checkout/data';
import loadStatusComponent from '../../const/load-status-component';
import loadStatus from '../../const/load-status';

let apiAddressActions = {

  getProvinces: (address) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/provinces?filter[country]=${config.i18n.country}`,
        method: 'GET'
      }, dispatch, true).then(data => {
        return dispatch(addressActions.setDataProvinces(data));
      });

    }
  },
  getDistricts: (address, province, autoCheck) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/districts?filter[country]=${config.i18n.country}&filter[province]=${province}`,
        method: 'GET'
      }, dispatch, true).then(data => {
        if (autoCheck) {
          return dispatch(addressActions.setDataDistricts(data, address, {
            checkDistrict: loadStatusComponent.autoCheckDistrict
          }));
        }
        return dispatch(addressActions.setDataDistricts(data, address));
      });

    }
  },
  getWards: (address, province, district, autoCheck) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/wards?filter[country]=${config.i18n.country}&filter[province]=${province}&filter[district]=${district}`,
        method: 'GET'
      }, dispatch, true).then(data => {
        if (autoCheck) {
          return dispatch(addressActions.setDataWards(data, address, {
            checkWard: loadStatusComponent.autoCheckWard
          }));
        }
        return dispatch(addressActions.setDataWards(data, address));
      });

    }
  },
  getListAddress: () => {
    return (dispatch) => {
      return helpers.request({
        uri: '/customer-address',
        method: 'GET'
      }, dispatch, true).then(data => {
        return dispatch(addressActions.setDataAddress(data.customerAddress));
      });
    };
  },
  insertAddress: (address) => {
    let removeList = false;
    if (address.customerAddressId) {
      removeList = true;
      delete address.customerAddressId;
    }
    return (dispatch) => {
      return helpers.requestMerge({
        uri: '/customer-address',
        method: 'PUT',
        body: {
          data: address
        }
      }, dispatch, true).then(data => {
        dispatch(addressActions.setItemDataListAddress(data.customerAddress, removeList));
        dispatch(checkoutActions.setAddressToCheckout(data.customerAddress, true, loadStatus.assignDataLoad));
        return null;
      });
    };
  },
  updateAddress: (address, dataAddress) => {
    if (address.customerAddressId) {

      let id = address.customerAddressId;
      delete address.customerAddressId;

      return (dispatch) => {
        return helpers.requestMerge({
          uri: `/customer-address/${id}`,
          method: 'POST',
          body: {
            data: address
          }
        }, dispatch, true).then(data => {
          return dispatch(addressActions.updateListAddress(data, dataAddress));
        });
      };
    }
  },
  deleteAddress: (id, address) => {
    return (dispatch) => {
      return helpers.request({
        uri: `/customer-address/${id}`,
        method: 'DELETE',
      }, dispatch, true).then(() => {
        return dispatch(addressActions.removeItemAddress(id, address));
      });
    };
  }

};

export default apiAddressActions;