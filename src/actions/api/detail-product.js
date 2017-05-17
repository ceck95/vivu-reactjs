/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:24:28+07:00
 */

const type = require('../../const/redux-actions');
const loadStatus = require('../../const/load-status');
const helpers = require('../../helpers/index');
import config from '../../config/index';
import detailProductActions from '../detail-product/data';

let apiDetailProductActions = {

  getProductDetail: (urlKey) => {
    return (dispatch) => {
      return helpers.requestBasic({
        uri: `/products/${urlKey}?filter[limit]=${config.default.limitListProductOfPageDetail}`,
        method: 'GET'
      }, dispatch).then(data => {
        return dispatch(detailProductActions.setDataProductDetail({
          resp: data,
          loadStatus: loadStatus.assignDataLoad
        }));
      });

    }
  }

};

export default apiDetailProductActions;
