/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T22:06:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T18:25:15+07:00
 */

import notifyActions from '../header/notify';
import { push } from 'react-router-redux';

let checkOrderActions = {
  checkProduct: (dataQuoteCart) => {
    return (dispatch) => {
      if (dataQuoteCart.length === 0) {
        dispatch(notifyActions.setDataNotify({
          uiMessage: `Product is not yet`,
          types: 'errors',
          show: true
        }));
        dispatch(push('/'));
      }
    }
  }
};

export default checkOrderActions;
