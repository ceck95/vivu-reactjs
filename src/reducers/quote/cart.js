/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-19T15:47:25+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-25T11:31:13+07:00
 */

const type = require('../../const/redux-actions');
const helpers = require('react-base').helpers;

module.exports = (dataQuoteCart = [], action) => {
  switch (action.type) {
    case type.setDataQuoteItem:
      {
        let checkInsertItem = true;
        action.dataQuoteCart.forEach((e, i) => {
          if (e.id === action.data.quoteItem.id) {
            action.dataQuoteCart[i].quantity = action.data.quoteItem.quantity;
            action.dataQuoteCart[i].basePrice = action.data.quoteItem.basePrice;
            checkInsertItem = false;
            if (action.data.delete) {
              action.dataQuoteCart.splice(i, 1);
            }
          }
        });

        if (checkInsertItem) {
          action.dataQuoteCart.push(action.data.quoteItem);
        }
        return [...action.dataQuoteCart];
      }
    case type.setDataQuoteItemInt:
      {
        return [...action.data.quoteItems];
      }
    default:
      return dataQuoteCart;
  }
};
