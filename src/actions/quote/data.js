/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-03T12:20:29+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T16:41:13+07:00
 */

const type = require('../../const/redux-actions');
const config = require('../../config/index');
const loadStatus = require('../../const/load-status');

let quoteActions = {
  setDataQuote: (data) => {
    let quoteId = localStorage.getItem(config.localStorage.keyQuote);
    if (!quoteId || quoteId !== data.quote.id) {
      localStorage.setItem(config.localStorage.keyQuote, data.quote.id);
    }
    data.loadDataCartStatus = loadStatus.startLoad;

    return {
      type: type.setDataQuote,
      data: data
    }
  },
  updateDataQuote: (data) => {
    return {
      type: type.updateDataQuote,
      data: data
    }
  }

};

export default quoteActions;
