/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T17:56:09+07:00
 */

const type = require('../../const/redux-actions');
const config = require('../../config/index');

let addressActions = {
  setDataProvinces: (data, address) => {
    return {
      type: type.setDataProvinces,
      data: data,
      address: address
    }
  },
  setDataDistricts: (data, address) => {
    return {
      type: type.setDataDistricts,
      data: data,
      address: address
    }
  },
  setDataWards: (data, address) => {
    return {
      type: type.setDataWards,
      data: data,
      address: address
    }
  }
};

export default addressActions;
