/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T16:27:31+07:00
 */

const type = require('../../const/redux-actions');
const config = require('../../config/index');

let quoteCartActions = {
  setDataQuoteItem: (data, dataQuoteCart) => {
    return {
      type: type.setDataQuoteItem,
      data: data,
      dataQuoteCart: dataQuoteCart
    }
  },
  setDataQuoteItemInt: (data) => {
    return {
      type: type.setDataQuoteItemInt,
      data: data
    }
  }
};

export default quoteCartActions;
