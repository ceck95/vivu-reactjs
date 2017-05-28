/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-25T09:05:46+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('../../helpers/index');
import config from '../../config/index';
import quoteItemActions from '../quote/cart';
import quoteActions from '../quote/data';
import ReactBase from 'react-base';
import loadStatus from '../../const/load-status';
import notifyActions from '../header/notify';

let apiQuoteItemActions = {

  setQuoteItem: (data, dataQuoteCart, dataQuote) => {
    return (dispatch) => {
      let id = localStorage.getItem(config.localStorage.keyQuote);
      return helpers.requestMerge({
        uri: `/quote-items/${id}`,
        method: 'PUT',
        body: {
          data: data
        }
      }, dispatch, true).then(data => {
        dispatch(quoteItemActions.setDataQuoteItem(data, dataQuoteCart));
        dispatch(quoteActions.updateDataQuote(ReactBase.helpers.Data.assign(dataQuote, {
          loadDataCartStatus: loadStatus.assignDataLoad
        })));
        dispatch(notifyActions.setDataNotify({
          uiMessage: `${data.quoteItem.product.name} add to cart successfully`,
          type: 'success',
          show: true
        }));
        return null;
      });

    }
  },
  removeQuoteItem: (data, dataQuoteCart, dataQuote) => {
    return (dispatch) => {
      return helpers.requestMerge({
        uri: `/quote-items/${data.id}`,
        method: 'DELETE',
        body: {
          data: data
        }
      }, dispatch, true).then(data => {
        data.delete = true;
        dispatch(quoteItemActions.setDataQuoteItem(data, dataQuoteCart));
        dispatch(quoteActions.updateDataQuote(ReactBase.helpers.Data.assign(dataQuote, {
          loadDataCartStatus: loadStatus.assignDataLoad
        })));
        return null;
      });

    }
  },
  updateQuantityQuoteItem: (data, dataQuoteCart, dataQuoteCartClone, dataQuote) => {

    dataQuoteCart.forEach((e, i) => {
      dataQuoteCartClone.forEach((a, y) => {
        if (dataQuoteCart[i].id === dataQuoteCartClone[y].id) {
          dataQuoteCart[i].quantity = dataQuoteCartClone[y].quantity;
        }
      });
    });

    return (dispatch) => {
      return helpers.requestMerge({
        uri: `/quote-items/${data.id}`,
        method: 'POST',
        body: {
          data: {
            quantity: data.quantity
          }
        }
      }, dispatch, true).then(data => {
        dispatch(quoteItemActions.setDataQuoteItem(data, dataQuoteCart));
        dispatch(quoteActions.updateDataQuote(ReactBase.helpers.Data.assign(dataQuote, {
          loadDataCartStatus: loadStatus.assignDataLoad
        })));
        return null;
      });

    }
  },
  getQuoteItemByQuote: (quoteId, dataQuote) => {
    return (dispatch) => {

      return helpers.requestMerge({
        uri: `/quote-items/${quoteId}`,
        method: 'GET'
      }, dispatch).then(data => {
        dispatch(quoteItemActions.setDataQuoteItemInt(data));
        dispatch(quoteActions.updateDataQuote(ReactBase.helpers.Data.assign(dataQuote, {
          loadDataCartStatus: loadStatus.assignDataLoad
        })));
        return null;
      });

    }
  }

};

export default apiQuoteItemActions;
