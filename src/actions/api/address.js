/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-14T17:59:20+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('../../helpers/index');
import addressActions from '../address/data';
import config from '../../config/index';

let apiAddressActions = {

  getProvinces: (address) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/provinces?filter[country]=${config.i18n.country}`,
        method: 'GET'
      }).then(data => {
        dispatch(addressActions.setDataProvinces(data, address));
      });

    }
  }

};

export default apiAddressActions;
