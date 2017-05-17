/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T12:21:24+07:00
 */

const type = require('../../const/redux-actions');
import { push } from 'react-router-redux';
import utility from '../../helpers/utility';
import loadStatus from '../../const/load-status';

let productFilterActions = {
  filterPrice: (routing, params) => {
    return (dispatch) => {
      let path = routing.locationBeforeTransitions,
        url = `${path.pathname}${path.search}`;
      if (path.query.price) {
        url = url.replace(path.query.price, params);
        dispatch(push(url));
      } else {
        dispatch(push(utility.filterUrl(url, `price=${params}`)));
      }
      dispatch(productFilterActions.setStatusLoadFilter(loadStatus.startLoad));
    }
  },
  setStatusLoadFilter: (status) => {
    return {
      type: type.setLoadFilterProduct,
      status: status
    }
  },
  filterOrderPrice: (routing, params) => {
    return (dispatch) => {
      let path = routing.locationBeforeTransitions,
        url = `${path.pathname}${path.search}`;
      if (path.query.priceOrder) {
        url = url.replace(path.query.priceOrder, params);
        dispatch(push(url));
      } else {
        dispatch(push(utility.filterUrl(url, `priceOrder=${params}`)));
      }
      dispatch(productFilterActions.setStatusLoadFilter(loadStatus.startLoad));
    }
  }
};

export default productFilterActions;
