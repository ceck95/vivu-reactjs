import helpers from '../../helpers/index';
import orderActions from '../order/data';

let orderActionsApi = {
  getOrders: () => {
    return (dispatch) => {
      return helpers.request({
        uri: '/orders',
        method: 'GET'
      }, dispatch).then(data => {
        dispatch(orderActions.setDataOrder(data));
      });
    }
  }
};

module.exports = orderActionsApi;