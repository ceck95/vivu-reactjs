/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T18:02:42+07:00
 */

const type = require('../../const/redux-actions');
import {
  helpers
} from 'react-base';

module.exports = (dataAddress = {
  provinces: [],
  districts: [],
  wards: []
}, action) => {
  switch (action.type) {
    case type.setDataProvinces:
      {
        return helpers.Data.assign(action.address, {
          provinces: action.data.provinces
        });
      }
    case type.setDataDistricts:
      {
        return helpers.Data.assign(action.address, {
          districts: action.data
        });
      }
    case type.setDataWards:
      {
        return helpers.Data.assign(action.address, {
          wards: action.data
        });
      }
    default:
      return dataAddress;
  }
};
