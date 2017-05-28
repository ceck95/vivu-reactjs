/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:26:16+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('../../helpers/index');
import config from '../../config/index';
import quoteActions from '../quote/data';
import notifyActions from '../header/notify';
import orderActionsApi from './order';
import { push } from 'react-router-redux';

let apiQuoteActions = {

  getQuote: (urlKey) => {
    return (dispatch) => {
      let id = localStorage.getItem(config.localStorage.keyQuote);
      return helpers.requestMerge({
        uri: `/quotes?filter[id]=${id}`,
        method: 'GET'
      }, dispatch).then(data => {
        return dispatch(quoteActions.setDataQuote(data));
      }).catch((err) => {
        return localStorage.removeItem(config.localStorage.keyQuote);
      });

    }
  },
  checkout: (data, isAuthenticated) => {
    return (dispatch) => {
      return helpers.requestMerge({
        uri: '/quotes/checkout',
        method: 'POST',
        body: {
          data: data
        }
      }, dispatch).then(data => {
        dispatch(apiQuoteActions.getQuote());
        dispatch(push('/'));
        dispatch(notifyActions.setDataNotify({
          uiMessage: `Order successfully`,
          type: 'success',
          show: true
        }));
        console.log(isAuthenticated);
        if (isAuthenticated) {
          dispatch(orderActionsApi.getOrders());
        }
        return null;
      }).catch(() => {
        dispatch(apiQuoteActions.getQuote());
        dispatch(push('/'));
        return null;
      });
    }
  }
};

export default apiQuoteActions;
